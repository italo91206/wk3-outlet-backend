const connection = require('../../database/connection');

export default {
  async listarTamanhos() {
    const tamanhos = await connection('tamanhos').select('*');
    return tamanhos;
  },
  async listarTamanho(req) {
    const { id } = req.query;
    const tamanho = await connection('tamanhos').where('tamanho_id', id).select('*').first();
    return tamanho;
  },
  async deletarTamanho(req) {
    const { id } = req.query;
    const deletar = await connection('tamanhos').where('tamanho_id', id).del('tamanho_id');
    return deletar;
  },
  async atualizarTamanho(req) {
    const  { tamanho } = req.body;
    const atualizar = await connection('tamanhos')
      .where('tamanho_id', tamanho.tamanho_id)
      .update(tamanho, 'tamanho_id');

    return atualizar;
  },
  async novoTamanho(req) { 
    const { tamanho } = req.body;
    const novo = await connection('tamanhos').insert(tamanho, 'tamanho_id');
    return novo;
  }
}