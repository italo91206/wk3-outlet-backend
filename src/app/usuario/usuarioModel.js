import {
  CredentialsExistenteException,
  DataNotFoundException,
} from '../../utils/exceptions';
import { get } from 'lodash';

const connection = require('../../database/connection');
// const bcrypt = require('bcryptjs');

/** Vai encriptografar a senha, gerando valores aleatorios */
// const encryptPassword = password => {
//   const salt = bcrypt.genSaltSync(10);
//   return bcrypt.hashSync(password, salt);
// };

export default {
  async listarUsuarios(){
    const usuarios = await connection('perfis').select('*');
    return usuarios;
  },

  async listarUsuario(req){
    const { id } = req.body;
    const usuario = await connection('perfis').select('*').where('id', '=', id).first();
    return usuario;
  },

  async novoUsuario(req){
    let response = 'ok';
    let novo;
    const { usuario } = req.body;

    
    if(!usuario.email)
      response = 'Não foi inserido um e-mail válido';
    else if(!usuario.password)
      response = 'Não foi inserido uma senha válida';
    else if(!usuario.nome)
      response = 'Não foi inserido um nome válido.';
    else if(!usuario.sobrenome)
      response = 'Não foi inserido um sobrenome válido';
    
    if(response == 'ok')
      novo = await connection('perfis').insert(usuario, 'id');
    
    return novo;
  },

  async deletarUsuario(req){
    const { id } = req.body;
    const deletar = await connection('perfis').where('id', id).del('id');

    return deletar;
  },

  async atualizarUsuario(req){
    const { usuario } = req.body;
    const atualizar = await connection('perfis').where('id', usuario.id).update(usuario, 'id');
    
    return atualizar;
  }

  // async updateUsuario(req) {
  //   const { id } = req.params;
  //   const usuario = { ...req.body };

  //   const usuarioFromDB = await connection('usuario') // acessa a tabela
  //     .where({ email: usuario.email })
  //     .first();

  //   if (usuarioFromDB) {
  //     if (usuarioFromDB.usuario_id != id) {
  //       throw new CredentialsExistenteException();
  //     }
  //   }

  //   usuario.senha = encryptPassword(usuario.senha);
  //   delete usuario.confirmaSenha;

  //   await connection('usuario').update(usuario).where('usuario_id', id);

  //   return {
  //     success: true,
  //     message: 'Cadastro alterado com sucesso',
  //   };
  // },

  // async getUsuario() {
  //   const usuarios = await connection('usuario').select('*');

  //   if (!usuarios.length) {
  //     throw new DataNotFoundException('Nenhum dado encontrado');
  //   }
  //   return usuarios;
  // },

  // async getUsuarioId(req) {
  //   const { id } = req.params;
  //   const usuario = await connection('usuario')
  //     .select('*')
  //     .where('usuario_id', id);

  //   if (!usuario.length) {
  //     throw new DataNotFoundException('Nenhum dado encontrado');
  //   }
  //   return usuario;
  // },

  // async deleteUsuario(req) {
  //   const { id } = req.params;

  //   const usuario = await connection('usuario')
  //     .where('usuario_id', id)
  //     .select('usuario')
  //     .first();

  //   if (usuario === undefined)
  //     throw new DataNotFoundException('Usuario não cadastrado');

  //   await connection('usuario').where('usuario_id', id).del();

  //   return {
  //     success: true,
  //     message: 'Usuario excluido com sucesso',
  //   };
  // },

  // async getCountLaudos(req) {
  //   const { user } = req.body;

  //   const novoCount = await connection('laudos as l')
  //     .count('laudo_id')
  //     .innerJoin('usuario as u', 'l.pessoa_id', 'u.pessoa_id')
  //     .where({ 'u.usuario_id': user, 'l.status_id': 1 })
  //     .first();

  //   const emAndamentoCount = await connection('laudos as l')
  //     .count('laudo_id')
  //     .innerJoin('usuario as u', 'l.pessoa_id', 'u.pessoa_id')
  //     .where({ 'u.usuario_id': user, 'l.status_id': 2 })
  //     .first();

  //   const concluidoCount = await connection('laudos as l')
  //     .count('laudo_id')
  //     .innerJoin('usuario as u', 'l.pessoa_id', 'u.pessoa_id')
  //     .where({ 'u.usuario_id': user, 'l.status_id': 3 })
  //     .first();

  //   const laudoStatus = {
  //     newReports: novoCount.count,
  //     inProgressReports: emAndamentoCount.count,
  //     doneReports: concluidoCount.count,
  //   };

  //   return {
  //     laudoStatus,
  //   };
  // },
};
