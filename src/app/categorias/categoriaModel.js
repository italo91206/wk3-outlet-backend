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
      .where('categoria_id', id);

    if(em_uso.length){
      throw { message: 'Não é possível deletar uma categoria em uso.' };
    }
    else{
      const filhos = await connection('categorias')
        .where('categoria_pai', id);

      if(filhos.length)
        throw { message: 'Não é possível deletar uma categoria com filhos.' };
      else{
        const deletar = await connection('categorias')
          .where('categoria_id', id)
          .del('categoria_id')
        return deletar;
      }
    }
  },
  
  async atualizarCategoria(req){
    const { categoria } = req.body;

    const ja_existe = await connection('categorias')
      .whereNot('categoria_id', categoria.categoria_id)
      .where('nome', categoria.nome);

    if(ja_existe.length)
      throw { message: 'Já existe uma categoria com esse nome.' };
    else{
      const em_uso = await connection('produtos')
        .where('categoria_id', categoria.categoria_id);
      
      if(em_uso.length)
        throw { message: 'Não é possível alterar uma categoria em uso.' };
      else{
        
        const filhos = await connection('categorias')
          .where('categoria_pai', categoria.categoria_id);

        if(filhos.length)
          throw { message: 'Não é possível alterar uma categoria com filhos.' };
        else{
          categoria.url = slugify(categoria.nome, { remove: /[*+~.()'"!:@]/g, lower: true });

          const atualizar = await connection('categorias')
            .where('categoria_id', categoria.categoria_id)
            .update(categoria, 'categoria_id');
          
          return atualizar;
        }
      }
    }
  },
}
