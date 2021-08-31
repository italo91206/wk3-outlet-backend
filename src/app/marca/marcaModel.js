import { DataNotFoundException } from '../../utils/exceptions';

const connection = require('../../database/connection');

export default {
  async listarMarcas() {
    const marcas = await connection('marcas')
      .where('is_enabled', true)
      .select('*')

    return marcas;
  },

  async listarMarca(req){
    const { id } = req.query;
    const marca = await connection('marcas')
      .where('marca_id', id)
      .select('*')
      .first();

    if(!marca)
      throw { message: 'Esta marca não existe.' };
    else
      return marca;
  },

  async deletarMarca(req) {
    const { id } = req.query;

    const em_uso = await connection('produtos')
      .where('marca_id', id)
      .select('*');

    if(em_uso.length){
      const atualizar = await connection('marcas')
        .where('marca_id', id)
        .update({ is_enabled: false });

      return atualizar;
    }
    else{
      const marca = await connection('marcas')
      .where('marca_id', id)
      .del();

      return marca;
    }
  },

  async editarMarca(req) {
    const { marca } = req.body;
    
    const repetido = await connection('marcas')
      .whereNot('marca_id', marca.marca_id)
      .where('marca', marca.marca)
      .select('*')
      .first();
    
    if(repetido)
      throw { message: "Já existe uma marca com esse nome!" };
    else{
      const atualizar = await connection('marcas')
      .where('marca_id', marca.marca_id)
      .update(marca, 'marca_id');

      return atualizar;
    }
  },

  async criarMarca(req) {
    const {marca} = req.body;
    const repetido = await connection('marcas')
      .where('marca', marca.marca)
      .first();

    if(repetido)
      throw { message: "Já existe uma marca com esse nome!" };
    else{
      // forçar is_enabled
      marca.is_enabled = true;

      const novo = await connection('marcas')
      .insert(marca, 'marca_id')

      return novo;
    }
  }
}