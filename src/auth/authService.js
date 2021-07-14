/** @module authService */

/** @description Import das dependências */
import jwt from 'jsonwebtoken';
import modelLogin from '../app/login/loginModel';
import config from '../config';
import { AuthenticationFailedException } from '../utils/exceptions';
import enviaEmail from '../utils/sendingEmails/sendingEmail';

/**
 * @class Authentication - Autentica as credenciais e cria o token
 */
export default class Auth {
  /**
   * @method AuthenticateAndReturnToken - Verifica login e senha e cria e, caso sejam válidos, cria token de autenticação
   * @param {string} login
   * @param {string} senha
   * @return {Object} Token de autenticação
   */
  static async AuthenticateAndReturnToken(login, senha) {
    const userData = await modelLogin.retrieveUserData(login, senha);
    
    if (!userData) {
      throw new AuthenticationFailedException();
    }

    const token = jwt.sign(
      {
        login,
        user: userData.id,
        nome: userData.nome,
      },
      
      config.token.SECRET_KEY,
      { expiresIn: config.token.expiration }
    );
    return { auth: true, token };
  }

  static async RecuperaSenhaReturnToken(login) {
    // Verifica se o e-mail existe, se não existir já retorna uma mensagem
    const userData = await modelLogin.checkUserEmail(login);

    const token = jwt.sign(
      {
        user: userData.id,
      },
      config.tokenRecuperaSenha.SECRET_KEY,
      { expiresIn: config.tokenRecuperaSenha.expiration }
    );
    // grava os dados na tabela de recupera_senha
    const userPerson = await modelLogin.retrieveUserEmail(login, token);

    enviaEmail.esqueceuSenha(login, token, userPerson.nome);

    return {
      auth: true,
      token,
      message: 'Verifique no e-mail o link de recuperação de senha',
    };
  }

  static async ativaCadastro(id) {
    const token = jwt.sign(
      {
        id,
      },
      config.tokenAtivaConta.SECRET_KEY
    );
    return {
      auth: true,
      token,
    };
  }
}
