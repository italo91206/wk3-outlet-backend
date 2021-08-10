import {DataNotFoundException} from '../../utils/exceptions';
import { isFunctionScopedDeclaration } from 'sucrase/dist/parser/tokenizer';

const connection = require('../../database/connection');

export default {
  async selectPerfil(req){
    const email = req.body.email;
    const password = req.body.password;

    const perfil = await connection('perfis')
      .select('*')
      .where('email', email)
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
