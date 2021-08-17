import { DataNotFoundException } from '../../utils/exceptions';

const connection = require('../../database/connection');

export default {
  async listarModelos() {
    const modelos = await connection('modelos').select('*')

<<<<<<< HEAD
        if (!modelos.length) {
            throw new DataNotFoundException('Nenhum dado encontrado');
        }

        console.log({modelos})
        return modelos;
    },

    async deletarModelo(req){
        const id = req.body.id;
        

        const modelo = await connection('modelos')
            .select('*')
            .where('id', id)
            .first();

        if (!modelo) {
            throw new DataNotFoundException('Nenhum dado encontrado');
        }

        await connection('modelos').where('id', id).del();

        return modelo;
    },

    async editarModelo(req){
        const body = req.body;
        const id = req.body.id
        let modelo;

        modelo = await connection('modelos')
            .select('*')
            .where('id', id)
            .first();

        console.log(modelo)

        if (!modelo) {
            throw new DataNotFoundException('Nenhum dado encontrado');
        }
=======
    if (!modelos.length) {
      throw new DataNotFoundException('Nenhum dado encontrado');
    }
>>>>>>> development

    // console.log({modelos})
    return modelos;
  },

  async deletarModelo(req) {
    const { id } = req.query;

    const em_uso = await connection('produtos')
      .where('modelo_id', id)
      .select('*');
    
    if(em_uso.length)
      throw { message: "Impossível deletar, alguns produtos utilizam deste modelo" }
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
      .where('modelo', modelo.modelo)
      .select('*')
      .first();

    if(repetido){
      throw { message: "Já existe um modelo com esse nome! "};
    }
    else{
      const atualizar = await connection('modelos')
        .where('modelo_id', modelo.modelo_id)
        .update(modelo, 'modelo_id');
      
      return atualizar;
    }
  },

  async criarModelo(req) {
    const { modelo } = req.body;
    const repetido = await connection('modelos')
      .where('modelo', modelo.modelo)
      .select('*')
      .first();

    if(repetido)
      throw { message: "Já existe um modelo com esse nome"};
    else{
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

    return modelo;
  }
}