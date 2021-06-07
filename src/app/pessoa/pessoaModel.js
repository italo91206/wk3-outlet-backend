import {
  DataNotFoundException,
  CredentialsExistenteException,
} from '../../utils/exceptions';

const connection = require('../../database/connection');

export default {
  async updatePessoa(req) {
    const body = { ...req.body };
    const { id } = req.params;
    const pessoa = {
      cpf: body.cpf,
      nome: body.nome,
      rg: body.rg,
      data_nascimento: body.dataNascimento,
      profissao_id: body.profissaoId,
    };

    const valida = await connection('pessoas')
      .where('pessoa_id', id)
      .select('pessoa_id')
      .first();

    if (valida === undefined)
      throw new DataNotFoundException('Pessoa não cadastrada');

    const pessoaFromDB = await connection('pessoas') // acessa a tabela
      .where({ cpf: pessoa.cpf })
      .first();

    if (pessoaFromDB) {
      if (pessoaFromDB.pessoa_id != id) {
        throw new CredentialsExistenteException('Cpf já cadastrado');
      }
    }

    if (pessoa.rg !== undefined) {
      const pessoaRgFromDB = await connection('pessoas') // acessa a tabela
        .where({ rg: pessoa.rg })
        .first();

      if (pessoaRgFromDB) {
        if (pessoaRgFromDB.pessoa_id != id) {
          throw new CredentialsExistenteException('Rg já cadastrado');
        }
      }
    }

    await connection('pessoas').update(pessoa).where('pessoa_id', id);

    return {
      success: true,
      message: 'Pessoa alterada com sucesso',
    };
  },

  async getPessoa() {
    const pessoas = await connection('pessoas').select('*');
    if (!pessoas.length) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }
    return pessoas;
  },

  async getPessoaId(req) {
    const { id } = req.params;
    const pessoa = await connection('pessoas')
      .select('*')
      .where('pessoa_id', id);
    if (!pessoa.length) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }
    return pessoa;
  },

  async deletePessoa(req) {
    const { id } = req.params;

    const pessoa = await connection('pessoas')
      .where('pessoa_id', id)
      .select('pessoa_id')
      .first();

    if (pessoa === undefined)
      throw new DataNotFoundException('Pessoa não cadastrada');

    await connection('pessoas').where('pessoa_id', id).del();

    return {
      success: true,
      message: 'Pessoa excluida com sucesso',
    };
  },
};
