const connection = require('../../database/connection');

export default {
  async verCategorias(){ 
    const categorias =  await connection('categorias').select('*');
    return categorias;
  },
  async verCategoria(req){ return 'foo'},
  async novaCategoria(req){ return 'foo'},
  async deletarCategoria(req){ return 'foo'},
  async atualizarCategoria(req){ return 'foo'},
}
