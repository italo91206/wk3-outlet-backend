const connection = require('../../database/connection');
import slugify from 'slugify';

export default {
  async verCategorias(){ 
    const categorias =  await connection('categorias')
      .where('is_enabled', true)
      .select('*');
    return categorias;
  },

  async verCategoria(req){
    const { id } = req.query;
    const categoria = await connection('categorias')
      .where('categoria_id', id)
      .select('*')
      .first();

    if(!categoria)
      throw { message: 'Não existe esta categoria' };
    else{
      return categoria;
    }
  },

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

  async deletarCategoria(req){ 
    const { id } = req.query;
    
    const em_uso = await connection('produtos')
      .where('categoria_id', id)
      .select('*');

    const filhos = await connection('categorias')
      .where('categoria_pai', id)
      .select('*');

    if(em_uso.length || filhos.length){
      const atualizar = await connection('categorias')
        .where('categoria_id', id)
        .update({is_enabled: false});

      // Caso exista categorias que o têm como pai,
      // percorrer por cada filho setando o id 
      // de categoria_pai para null
      if(filhos.length){
        filhos.forEach(async (item) => {
          const atualizar = await connection('categorias')
            .where('categoria_id', item.categoria_id)
            .update({categoria_pai: null})
        })
      } 
      return atualizar;
    }
    else{
      const deletar = await connection('categorias')
        .where('categoria_id', id)
        .del('categoria_id')
      return deletar;
    }
  },
  
  async atualizarCategoria(req){
    const { categoria } = req.body;

    categoria.url = slugify(categoria.nome, { remove: /[*+~.()'"!:@]/g, lower: true });

    const atualizar = await connection('categorias')
      .where('categoria_id', categoria.categoria_id)
      .update(categoria, 'categoria_id');
    
    return atualizar;
  },
}
