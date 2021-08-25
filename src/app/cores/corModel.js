import {
  CredentialsExistenteException,
  DataNotFoundException,
} from '../../utils/exceptions';

const connection = require('../../database/connection');

export default {
  async getCores(req) {
    const cores = await connection('cores')
      .where('is_enabled', true)
      .select('*');

    return cores;
  },

  async getCor(req) {
    const { id } = req.query;
    const cor = await connection('cores')
      .where('cor_id', id)
      .select('*')
      .first();

    if (!cor)
      throw { message: "Essa cor não existe." };
    else
      return cor;
  },

  async deletarCor(req) {
    const { id } = req.query;
    const em_uso = await connection('produtos')
      .where('cor_id', id)
      .select('*');

    if (em_uso.length) {
      const atualizar = await connection('cores')
        .where('cor_id', id)
        .update({ is_enabled: false });
      return atualizar;
    }
    else {
      const deletar = await connection('cores')
        .where('cor_id', id)
        .del('cor_id');
      return deletar;
    }
  },

  async novaCor(req) {
    const { cor } = req.body;

    const repetido = await connection('cores')
      .where('cor', cor.cor)
      .first();

    if (repetido)
      throw { message: "Já existe uma cor com esse nome!" };

    const novo = await connection('cores').insert(cor, 'cor_id');
    return novo;
  },

  async atualizarCor(req) {
    const { cor } = req.body;

    const repetido = await connection('cores')
      .where('cor', cor.cor)
      .first();

    if (repetido && repetido.cor_id != cor.cor_id && repetido.cor == cor.cor)
      throw { message: "Já existe uma cor com esse nome!" };

    const atualizar = await connection('cores').where('cor_id', cor.cor_id).update(cor, 'cor_id');
    return atualizar;
  }
}