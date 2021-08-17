const connection = require('../../database/connection');

export default {
  async verCategorias(){ 
    const categorias =  await connection('categorias').select('*');
    return categorias;
  },
  async verCategoria(req){ return 'foo'},
  async novaCategoria(req){ return 'foo'},
  async deletarCategoria(req){ return 'foo'},
  
  async atualizarCategoria(req){
    const { categoria } = req.body;
    const atualizar = await connection('categorias')
      .where('categoria_id', categoria.categoria_id)
      .update(categoria, 'categoria_id');
    
    return atualizar;
  },
}
