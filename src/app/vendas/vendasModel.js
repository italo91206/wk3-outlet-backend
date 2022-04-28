const connection = require('../../database/connection');

export default {
  async listarVendas(){
    const vendas = await connection('vendas')
      .innerJoin('perfis', 'vendas.usuario_id', 'perfis.id')
      .select('*', 'perfis.nome as cliente')

    // console.log(vendas);
    return vendas;
  },

  async recuperarVenda(venda_id){

    const venda = await connection('vendas')
      .where('venda_id', venda_id)
      .leftJoin('cupons', 'vendas.venda_id', 'cupons.cupom_id')
      .leftJoin('perfis', 'vendas.usuario_id', 'perfis.id')
      .first();

    const produtos = await connection('produtos_vendas')
      .where('venda_id', venda_id)
      .leftJoin('produtos', 'produtos_vendas.produto_id', 'produtos.produto_id')
      .leftJoin('imagens', 'produtos_vendas.produto_id', 'imagens.produto_id')

    return {
      venda: venda,
      produtos: produtos
    };
  }
}
