import {
  CredentialsExistenteException,
  DataNotFoundException,
} from '../../utils/exceptions';
import { get } from 'lodash';

const connection = require('../../database/connection');
const bcrypt = require('bcryptjs');

/** Vai encriptografar a senha, gerando valores aleatorios */
const encryptPassword = password => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

export default {
  async updateUsuario(req) {
    const { id } = req.params;
    const usuario = { ...req.body };

    const usuarioFromDB = await connection('usuario') // acessa a tabela
      .where({ email: usuario.email })
      .first();

    if (usuarioFromDB) {
      if (usuarioFromDB.usuario_id != id) {
        throw new CredentialsExistenteException();
      }
    }

    usuario.senha = encryptPassword(usuario.senha);
    delete usuario.confirmaSenha;

    await connection('usuario').update(usuario).where('usuario_id', id);

    return {
      success: true,
      message: 'Cadastro alterado com sucesso',
    };
  },

  async getUsuario() {
    const usuarios = await connection('usuario').select('*');

    if (!usuarios.length) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }
    return usuarios;
  },

  async getUsuarioId(req) {
    const { id } = req.params;
    const usuario = await connection('usuario')
      .select('*')
      .where('usuario_id', id);

    if (!usuario.length) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }
    return usuario;
  },

  async deleteUsuario(req) {
    const { id } = req.params;

    const usuario = await connection('usuario')
      .where('usuario_id', id)
      .select('usuario')
      .first();

    if (usuario === undefined)
      throw new DataNotFoundException('Usuario não cadastrado');

    await connection('usuario').where('usuario_id', id).del();

    return {
      success: true,
      message: 'Usuario excluido com sucesso',
    };
  },

  async getCountLaudos(req) {
    const { user } = req.body;

    const novoCount = await connection('laudos as l')
      .count('laudo_id')
      .innerJoin('usuario as u', 'l.pessoa_id', 'u.pessoa_id')
      .where({ 'u.usuario_id': user, 'l.status_id': 1 })
      .first();

    const emAndamentoCount = await connection('laudos as l')
      .count('laudo_id')
      .innerJoin('usuario as u', 'l.pessoa_id', 'u.pessoa_id')
      .where({ 'u.usuario_id': user, 'l.status_id': 2 })
      .first();

    const concluidoCount = await connection('laudos as l')
      .count('laudo_id')
      .innerJoin('usuario as u', 'l.pessoa_id', 'u.pessoa_id')
      .where({ 'u.usuario_id': user, 'l.status_id': 3 })
      .first();

    const laudoStatus = {
      newReports: novoCount.count,
      inProgressReports: emAndamentoCount.count,
      doneReports: concluidoCount.count,
    };

    return {
      laudoStatus,
    };
  },
};
