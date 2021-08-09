const connection = require('../../database/connection');

export default {
  async getCupons(){
    const cupons = await connection('cupons').select('*');
    return cupons;
  },

  async getCupom(req){
    const { id } = req.query;
    const cupom = await connection('cupons').where('cupom_id', id).select('*').first();
    return cupom;
  },

  async deletarCupom(req){
    const { id } = req.query;
    const deletar = await connection('cupons')
      .where('cupom_id', id)
      .del('cupom_id');

    return deletar;
  },

  async atualizarCupom(req){
    const {cupom} = req.body;
    const atualizar = await connection('cupons')
      .where('cupom_id', cupom.cupom_id)
      .update(cupom, 'cupom_id');

    return atualizar;
  },

  async novoCupom(req){
    const { cupom } = req.body;
    const novo = await connection('cupons').insert(cupom, 'cupom_id');
    return novo;
  }
}

