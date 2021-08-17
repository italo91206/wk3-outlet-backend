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
    
    const repetido_nome = await connection('cupons')
      .where('nome', cupom.nome)
      .select('*')
      .first();

    if(repetido_nome && repetido_nome.cupom_id != cupom.cupom_id ){
      throw { message: "Já existe um cupom com esse nome!" };
    }

    const repetido_codigo = await connection('cupons')
      .where('codigo', cupom.codigo)
      .select('*')
      .first();

    if(repetido_codigo && repetido_codigo.cupom_id != cupom.cupom_id)
      throw { message: "Já existe um cupom com esse código!" };

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

