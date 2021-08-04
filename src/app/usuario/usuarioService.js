import model from './usuarioModel';
import { parseObjectToCamelCase } from '../../utils/utils';

// function valida(email, senha, confirmaSenha) {
//   if (!email.match(emailRegex)) {
//     throw new InvalidEmailException();
//   }
//   if (!senha.match(passwordRegex) || !confirmaSenha.match(passwordRegex)) {
//     throw new PasswordTips();
//   }
//   if (senha !== confirmaSenha) {
//     throw new PasswordsDontMatch();
//   }
// }

/** Validação de e-mail e senha  */
// const emailRegex = /\S+@\S+\.\S+/;
// const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20})/;

export default {
  async handleListarUsuarios(){
    const dados = await model.listarUsuarios();
    return dados;
  },

  async handleListarUsuario(req){
    const dados = await model.listarUsuario(req);
    return dados;
  },

  async handleNovoUsuario(req){
    const dados = await model.novoUsuario(req);
    return dados;
  },

  async handleDeletarUsuario(req){
    const dados = await model.deletarUsuario(req);
    return dados;
  },

  async handleAtualizarUsuario(req){
    const dados = await model.atualizarUsuario(req);
    return dados;
  }

  // async handleAlteraRequest(req) {
  //   const { email, senha, confirmaSenha } = { ...req.body };

  //   valida(email, senha, confirmaSenha);

  //   const usuario = await model.updateUsuario(req);
  //   return usuario;
  // },

  // async handleDeleteRequest(req) {
  //   const usuario = await model.deleteUsuario(req);
  //   return usuario;
  // },

  // async handleBuscaUsuarioRequest() {
  //   const usuario = await model.getUsuario();
  //   return parseObjectToCamelCase(usuario);
  // },

  // async handleBuscaUsuarioIdRequest(req) {
  //   const usuario = await model.getUsuarioId(req);
  //   return parseObjectToCamelCase(usuario);
  // },

  // async handleCountLaudosRequest(req) {
  //   const countLaudos = await model.getCountLaudos(req);

  //   return countLaudos;
  // },
};
