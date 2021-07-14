import {
  InvalidCredentialsException,
  AuthenticationFailedException,
  InvalidEmailException,
} from '../../utils/exceptions';

const connection = require('../../database/connection');
const bcrypt = require('bcryptjs');

/** Verificar se o login é existente */
async function loginExists(email, senha) {
  const user = await connection('perfis')
    .select('*')
    .where('email', email)
    .where('password', senha)
    .first();

  if (!user) {
    throw new InvalidCredentialsException();
  }

  return user;
}

export default {
  async retrieveUserData(email, senha) {
    const validateLogin = await loginExists(email, senha);

    if (!validateLogin) {
      throw new InvalidCredentialsException('Senha incorreta');
    }

    return {
      id: validateLogin.id,
      nome: validateLogin.nome
    };
  },

  async checkUserEmail(email) {
    const usuarioFromDB = await connection('usuario') // acessa a tabela
      .where({ email: email })
      .first();

    if (!usuarioFromDB) {
      throw new InvalidEmailException();
    }

    return { id: usuarioFromDB.usuario_id };
  },

  async retrieveUserEmail(email, token) {
    const usuarioFromDB = await connection('usuario') // acessa a tabela
      .where({ email: email })
      .first();

    const dataAtual = new Date();

    const recupera = {
      usuario_id: usuarioFromDB.usuario_id,
      data_tentativa: dataAtual,
      token,
      ativo: true,
    };

    await connection('recupera_senha')
      .returning('recupera_senha_id')
      .insert(recupera);

    const pessoaFromDB = await connection('pessoas') // acessa a tabela
      .where({ pessoa_id: usuarioFromDB.pessoa_id })
      .first();

    return {
      nome: pessoaFromDB.nome,
    };
  },
};
