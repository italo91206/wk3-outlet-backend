const connection = require('../../database/connection');

export default {
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
    const em_uso = await connection('produtos')
      .where('tamanho_id', id)
      .select('*');

    if(em_uso.length){
      const atualizar = await connection('tamanhos')
        .where('tamanho_id', id)
        .update({ is_enabled: false });

      return atualizar;
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
      .where('tamanho', tamanho.tamanho)
      .select('*')
      .first();
    
    if(repetido && repetido.tamanho_id != tamanho.tamanho_id && repetido.tamanho == tamanho.tamanho)
      throw { message: "Já existe esse tamanho!" };

    const atualizar = await connection('tamanhos')
      .where('tamanho_id', tamanho.tamanho_id)
      .update(tamanho, 'tamanho_id');

    return atualizar;
  },
  async novoTamanho(req) { 
    const { tamanho } = req.body;

    // forçar is_enabled
    tamanho.is_enabled = true;

    const novo = await connection('tamanhos')
      .insert(tamanho, 'tamanho_id');
    return novo;
  }
}