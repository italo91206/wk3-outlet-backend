import { DataNotFoundException } from '../../utils/exceptions';

const connection = require('../../database/connection');

export default {
  async listarMarcas() {
    const marcas = await connection('marcas').select('*')

    if (!marcas.length) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }
    return marcas;
  },

  async deletarMarca(req) {
    const { id } = req.body;

    const marca = await connection('marcas')
      .select('*')
      .where('id', id)
      .first();

    if (!marca) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }

    await connection('marcas').where('id', id).del();

    return marca;
  },

  async editarMarca(req) {
    const body = req.body;
    let marca;

    marca = await connection('marcas')
      .select('*')
      .where('id', body.id)
      .first();

    if (!marca) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }

    await connection('marcas')
      .update(body)
      .where('id', body.id)
  },

  async criarMarca(req) {
    const marca = req.body;

    const [id] = await connection('marcas')
      .returning('id')
      .insert(marca)

    return {
      success: true,
      message: 'Marca inserido com sucesso',
      id: id
    }
  }
}