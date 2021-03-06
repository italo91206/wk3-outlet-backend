const connection = require('../../database/connection');

export default {

  async tamanhoAlreadyInUse(term){
    const sliced_term = term.slice(1)
    const capitalized_term = `${term[0].toUpperCase()}${sliced_term.toLowerCase()}`
    
    const tamanho = await connection('tamanhos')
      .where('tamanho', 'like', term.toUpperCase())
      .orWhere('tamanho', 'like', term.toLowerCase())
      .orWhere('tamanho', 'like', capitalized_term)
      .first();

    return tamanho;
  },

  async listarTamanhos() {
    const tamanhos = await connection('tamanhos')
      .where('is_enabled', true)
      .select('*');

    return tamanhos;
  },

  async listarTamanho(req) {
    const { id } = req.query;
    const tamanho = await connection('tamanhos')
      .where('tamanho_id', id)
      .select('*')
      .first();

    if(!tamanho)
      throw { message: "Este tamanho não existe." };
    else
      return tamanho;
  },

  async deletarTamanho(req) {
    const { id } = req.query;
    const em_uso = await connection('variacoes')
      .where('tamanho_id', id);

    if(em_uso.length){
      throw { message: 'Não é possível deletar um tamanho já em uso.' };
    }
    else{
      const deletar = await connection('tamanhos')
        .where('tamanho_id', id)
        .del('tamanho_id');
      return deletar;
    }
  },

  async atualizarTamanho(req) {
    const  { tamanho } = req.body;

    const repetido = await connection('tamanhos')
      .whereNot('tamanho_id', tamanho.tamanho_id)
      .where('tamanho', tamanho.tamanho);
    
    if(repetido.length)
      throw { message: "Já existe esse tamanho!" };
    else{
      const em_uso = await connection('variacoes')
        .where('tamanho_id', tamanho.tamanho_id);

      if(em_uso.length)
        throw { message: 'Não é possível atualizar um tamanho em uso.' };
      else{
        const atualizar = await connection('tamanhos')
          .where('tamanho_id', tamanho.tamanho_id)
          .update(tamanho, 'tamanho_id');

        return atualizar;
      }
    }
  },

  async novoTamanho(req) { 
    const { tamanho } = req.body;

    const repetido = await connection('tamanhos')
      .where('tamanho', tamanho.tamanho)
      .select('*')
      .first();

    const tamanho_in_use = await this.tamanhoAlreadyInUse(tamanho.tamanho)
    
    if(repetido || tamanho_in_use)
      throw { message: "Já existe esse tamanho!" };
    else{
      // forçar is_enabled
      tamanho.is_enabled = true;

      const novo = await connection('tamanhos')
        .insert(tamanho, 'tamanho_id');
      return novo;
    }
  }
}