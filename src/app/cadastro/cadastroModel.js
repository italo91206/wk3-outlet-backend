import {
  CredentialsExistenteException,
  DataNotFoundException,
  AuthenticationFailedException,
  PasswordPrevious,
} from '../../utils/exceptions';
import geraToken from '../../auth/authService';
// import enviaEmail from '../../utils/sendingEmails/sendingEmail';
import bcrypt from 'bcryptjs';

const connection = require('../../database/connection');
const bcrypt = require('bcryptjs');

/** Vai encriptografar a senha, gerando valores aleatorios */
const encryptPassword = password => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

export default {
  /** Cria o Cadastro */
  async insertCadastro(req) {
    var usuId = '';
    var nomePessoa = '';
    await connection.transaction(async trx => {
      const body = { ...req.body };
      const { senha } = { ...req.body };
      const pessoa = {
        nome: body.nome,
        data_nascimento: body.dataNascimento,
        data_cadastro: new Date(),
        cpf: body.cpf,
      };
      let pessoaId = 0;

      const validaId = await connection('pessoas') // acessa a tabela
        .where({ cpf: pessoa.cpf })
        .select('pessoa_id')
        .first();

      if (!validaId) {
        /** Inserção da Pessoa */

        const [id] = await trx('pessoas').returning('pessoa_id').insert(pessoa);
        pessoaId = id;

        /** Inserção do Contato Pessoa */
        const pessoaContato = {
          telefone_fixo: body.telefoneFixo,
          telefone_auxiliar: body.telefoneAuxiliar,
          celular: body.celular,
          pessoa_id: pessoaId,
          prefix_id: body.prefixId,
        };

        await trx('pessoas_contato').insert(pessoaContato);
      } else pessoaId = validaId.pessoa_id;

      /** Inserção do Login */
      let login = '';
      if (senha) {
        login = {
          email: body.email,
          senha: body.senha,
          senha: encryptPassword(body.senha),
          pessoa_id: pessoaId,
          nivel_usuario_id: body.nivelUsuarioId,
          ativo: true,
        };
      } else {
        login = {
          email: body.email,
          pessoa_id: pessoaId,
          nivel_usuario_id: body.nivelUsuarioId,
          id_acess_face: body.idAcessFace,
          id_acess_gmail: body.idAcessGmail,
          ativo: true,
        };
      }
      const usuarioFromDB = await connection('usuario') // acessa a tabela
        .where({ email: login.email })
        .first();

      if (usuarioFromDB) {
        throw new CredentialsExistenteException();
      }

      const [usuarioId] = await trx('usuario')
        .returning('usuario_id')
        .insert(login);

      const token = geraToken.ativaCadastro(usuarioId);
      const ativaConta = {
        usuario_id: usuarioId,
        token: (await token).token,
      };

      await trx('ativacao_conta').insert(ativaConta);

      usuId = usuarioId;
      nomePessoa = pessoa.nome;

      // enviaEmail.ativaCadastro(login.email, nomePessoa, ativaConta.token);
    });
    return {
      success: true,
      message:
        'Cadastro feito com sucesso, verifique no e-mail o link de ativação',
      usuarioId: usuId,
      nomePessoa,
    };
  },

  async insertCadastraSenhaNova(req) {
    const { senha } = { ...req.body };
    let { 'x-access-token': token } = req.headers;

    const recuperaFromDB = await connection('recupera_senha') // acessa a tabela
      .where({ token: token })
      .first();

    if (!recuperaFromDB) {
      throw new DataNotFoundException();
    } else if (recuperaFromDB.ativo === true) {
      const usuario = {
        senha: encryptPassword(senha),
      };
      //** Verifica se a senha nova é igual a anterior */
      const user = await connection('usuario')
        .where({ usuario_id: recuperaFromDB.usuario_id })
        .first();

      const isMatch = bcrypt.compareSync(senha, user.senha);

      if (isMatch) {
        throw new PasswordPrevious();
      }

      await connection('usuario')
        .update(usuario)
        .where('usuario_id', recuperaFromDB.usuario_id);

      const senhaAlterada = {
        ativo: false,
      };

      await connection('recupera_senha')
        .update(senhaAlterada)
        .where('usuario_id', recuperaFromDB.usuario_id);
    } else {
      throw new AuthenticationFailedException();
    }

    return {
      success: true,
      message: 'Senha alterado com sucesso',
    };
  },

  async AtivaCadastra(req) {
    const { authorization } = req.body;

    const usuario = await connection('ativacao_conta')
      .where('token', authorization)
      .first();

    if (usuario === undefined)
      throw new DataNotFoundException('Usuario já ativo ou não cadastrado');

    const idUsu = { ativo: true };
    await connection('usuario')
      .update(idUsu)
      .where('usuario_id', usuario.usuario_id);

    await connection('ativacao_conta')
      .where('usuario_id', usuario.usuario_id)
      .del();

    return {
      success: true,
      message: 'Cadastro ativado com sucesso',
    };
  },

  async getPrefix() {
    const prefix = await connection('contato_prefix').select('*');
    if (!prefix.length) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }
    return prefix;
  },

  async getPrefixId(req) {
    const { id } = req.params;
    const prefix = await connection('contato_prefix')
      .select('*')
      .where('prefix_id', id);
    if (!prefix.length) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }
    return prefix;
  },
};
