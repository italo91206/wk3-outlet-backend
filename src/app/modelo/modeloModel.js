import { DataNotFoundException } from '../../utils/exceptions';

const connection = require('../../database/connection');

export default {
  async listarModelos() {
    const modelos = await connection('modelos')
      .where('is_enabled', true)
      .select('*')
    return modelos;
  },

  async deletarModelo(req) {
    const { id } = req.query;

    const em_uso = await connection('produtos')
      .where('modelo_id', id)
      .select('*');
    
    if(em_uso.length){
      throw { message: 'Não é possível deletar um modelo já em uso.' };
    }
    else{
      const deletar = await connection('modelos')
        .where('modelo_id', id)
        .del('modelo_id');
      return deletar;
    }
  },

  async editarModelo(req) {
    const { modelo } = req.body;
    const repetido = await connection('modelos')
      .whereNot('modelo_id', modelo.modelo_id)
      .where('modelo', modelo.modelo);

    if(repetido.length){
      throw { message: "Já existe um modelo com esse nome! "};
    }
    else{
      const em_uso = await connection('produtos')
        .where('modelo_id', modelo.modelo_id);
      
      if(em_uso.length)
        throw { message: 'Não é possível alterar um modelo já em uso.' };
      else{
        const atualizar = await connection('modelos')
          .where('modelo_id', modelo.modelo_id)
          .update(modelo, 'modelo_id');
        
        return atualizar;
      }
    }
  },

  async criarModelo(req) {
    const { modelo } = req.body;  

    const repetido = await connection('modelos')
      .where('modelo', modelo.modelo)
      .select('*')

    if(repetido.length)
      throw { message: "Já existe um modelo com esse nome"};
    else {
      // forçar is_enabled
      modelo.is_enabled = true;
      
      const novo = await connection('modelos')
        .insert(modelo, 'modelo_id');
      return novo;
    }
  },

  async verModelo(req){
    const {id} = req.query;
    const modelo = await connection('modelos')
      .where('modelo_id', id)
      .select('*')
      .first();

    if(!modelo)
      throw { message: "Este modelo não existe." };
    else
      return modelo;
  }
}