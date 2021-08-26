const connection = require('../../database/connection');
import slugify from 'slugify';

export default {
  async verCategorias(){ 
    const categorias =  await connection('categorias').select('*');
    return categorias;
  },
  async verCategoria(req){ return 'foo'},

  async novaCategoria(req){ 
    const { categoria } = req.body;
    const ja_existe = await connection('categorias')
      .where('nome', categoria.nome)
      .select('*')
      .first();
    
    if(ja_existe)
      throw { message: 'Já existe uma categoria com esse nome!' };
    else{
      // force is_enabled
      categoria.is_enabled = true;
      categoria.url = slugify(categoria.nome, { remove: /[*+~.()'"!:@]/g, lower: true });

      const novo = await connection('categorias')
        .insert(categoria, 'categoria_id');
      return novo;
    }
  },

  async deletarCategoria(req){ return 'foo'},
  
  async atualizarCategoria(req){
    const { categoria } = req.body;
    const atualizar = await connection('categorias')
      .where('categoria_id', categoria.categoria_id)
      .update(categoria, 'categoria_id');
    
    return atualizar;
  },
}
