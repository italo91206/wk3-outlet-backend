import { DataNotFoundException } from '../../../utils/exceptions';

const connection = require('../../../database/connection');

export default {
  async insertBairro(req) {
    const body = { ...req.body };
    const bairro = {
      nome: body.nome,
    };

    const [id] = await connection('bairros')
      .returning('bairro_id')
      .insert(bairro);

    return {
      success: true,
      message: 'bairro cadastrado com sucesso',
      id,
    };
  },

  async updateBairro(req) {
    const { id } = req.params;
    const body = { ...req.body };
    const bairro = {
      nome: body.nome,
    };

    const bai = await connection('bairros')
      .where('bairro_id', id)
      .select('bairros')
      .first();

    if (bai === undefined)
      throw new DataNotFoundException('Bairro não cadastrado');

    await connection('bairros').update(bairro).where('bairro_id', id);

    return {
      success: true,
      message: 'bairro alterado com sucesso',
    };
  },

  async getBairros() {
    const bairros = await connection('bairros').select('*');

    if (!bairros.length) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }
    return bairros;
  },

  async getBairroId(req) {
    const { id } = req.params;
    const bairro = await connection('bairros')
      .select('*')
      .where('bairro_id', id);

    const bai = await connection('bairros')
      .where('bairro_id', id)
      .select('bairros')
      .first();

    if (bai === undefined)
      throw new DataNotFoundException('Bairro não cadastrado');

    if (!bairro.length) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }
    return bairro;
  },

  async deleteFisicoBairro(req) {
    const { id } = req.params;

    const bairro = await connection('bairros')
      .where('bairro_id', id)
      .select('bairros')
      .first();

    if (bairro === undefined)
      throw new DataNotFoundException('bairro não cadastrada');

    await connection('bairros').where('bairro_id', id).del();

    return {
      success: true,
      message: 'Exclusão feita com sucesso',
    };
  },
};
