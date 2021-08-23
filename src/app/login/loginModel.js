import {DataNotFoundException} from '../../utils/exceptions';
import { isFunctionScopedDeclaration } from 'sucrase/dist/parser/tokenizer';

var jwt = require("jsonwebtoken");

const connection = require('../../database/connection');

export default {
  async loginExists(email, password){
    const existe = await connection('perfis')
      .where('email', email)
      .where('password', password)
      .select('*')
      .first();
    
    return existe;
  },

  async retrieveUserData(req) {
    const { email, password } = req.body;

    const validateLogin = await this.loginExists(email, password);

    if (!validateLogin) {
      throw new InvalidCredentialsException('Senha incorreta');
    }
    
    var token = jwt.sign( { usuario: validateLogin} , process.env.SECRET_KEY, 
      {expiresIn: 86400}
    );

    return { token, usuario: validateLogin };
  },

  async checkUserEmail(email) {
    const usuarioFromDB = await connection('usuario') // acessa a tabela
      .where({ email: email })
      .first();

    if(!perfil){
      return {
        success: false,
        message: "Perfil não encontrado"
      }
    }

    if(perfil.isAdmin){
      return {
        success: true,
        perfil: perfil
      }
    }
    else{
      return {
        success: false,
        message: "Usuário não tem permissão."
      }
    }
  }
};
