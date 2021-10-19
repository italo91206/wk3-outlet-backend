const connection = require('../../database/connection');

export default {
  async listarVendas(){
    const vendas = await connection('vendas')
      .innerJoin('perfis', 'vendas.usuario_id', 'perfis.id')
      .select('*', 'perfis.nome as cliente')
    
    // console.log(vendas);
    return vendas;
  },

  async recuperarVenda(req){
    const {id} = req.query;

    

    const venda = await connection('vendas')
      .where('venda_id', id)
      .first();

    console.log(venda);

    return venda;
  }
}