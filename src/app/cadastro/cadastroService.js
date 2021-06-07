import model from './cadastroModel';
import { parseObjectToCamelCase } from '../../utils/utils';
import {
  PasswordsDontMatch,
  InvalidEmailException,
  PasswordTips,
} from '../../utils/exceptions';

const validations = require('../../utils/validations');

export default {
  async handleCadastroRequest(req) {
    const { nome, email, senha, confirmaSenha } = { ...req.body };

    const valUsuEmail = validations.userSchema.validate({
      username: nome,
      email: email,
    });

    if (valUsuEmail.error) {
      throw new InvalidEmailException();
    }

    const valSenha = validations.userSchemaPassword.validate({
      password: senha,
      confirmPassword: confirmaSenha,
    });

    if (senha) {
      if (valSenha.error) {
        throw new PasswordTips();
      }
      if (senha !== confirmaSenha) {
        throw new PasswordsDontMatch();
      }
    }

    const cadastro = await model.insertCadastro(req);

    return cadastro;
  },

  async handleRecuperaSenhaRequest(req) {
    const { senha, confirmaSenha } = { ...req.body };
    const valSenha = validations.userSchemaPassword.validate({
      password: senha,
      confirmPassword: confirmaSenha,
    });

    if (senha) {
      if (valSenha.error) {
        throw new PasswordTips();
      }
      if (senha !== confirmaSenha) {
        throw new PasswordsDontMatch();
      }
    }

    const cadastro = await model.insertCadastraSenhaNova(req);

    return cadastro;
  },

  async AtivaCadastroRequest(req) {
    const cadastro = await model.AtivaCadastra(req);
    return cadastro;
  },

  async handleBuscaPrefixRequest() {
    const prefix = await model.getPrefix();
    return parseObjectToCamelCase(prefix);
  },

  async handleBuscaPrefixIdRequest(req) {
    const prefix = await model.getPrefixId(req);
    return parseObjectToCamelCase(prefix);
  },
};
