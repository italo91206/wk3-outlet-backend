const connection = require('../../database/connection');
const mercadopago = require('mercadopago');
var axios = require('axios')

import dotenv from 'dotenv';
dotenv.config();

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

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

    for(const produto of produtos){
      const imagem = await connection('imagens')
        .where('produto_id', produto.produto_id)
        .first();

      if(imagem)
        produto.imagem_url = imagem.url;
      else
        produto.imagem_url = "";
    }

    return {
      venda: venda,
      produtos: produtos
    };
  },

  async cancelarVenda(id_venda){
    const venda = await connection('vendas')
      .where('venda_id', id_venda)
      .first();

    console.log("preference_id", venda.preference_id)

    let url = `https://api.mercadopago.com/merchant_orders/search?preference_id=${venda.preference_id}`

    const payments = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`
      }
    })
    .then(async (response) => {
      let payments = response.data.elements[0].payments
      return payments
    })
    .catch((error) => {
      console.log(error.message)
      throw { message: "Não foi possível realizar a busca por pagamentos." }
    })

    payments.forEach(async (p) => {
      await mercadopago.payment.cancel(p.id)
        .catch((err) => {
          console.log('Não foi possível cancelar o pagamento')
          console.log(err)
        })
    })

    await connection('vendas')
      .where('preference_id', venda.preference_id)
      .update({ status: 'cancelado' })

    return true;
  }
}
