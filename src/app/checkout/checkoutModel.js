const connection = require('../../database/connection');
const mercadopago = require('mercadopago');
var jwt = require("jsonwebtoken");

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

export default {
  async realizarVenda(req){

    let usuario = req.headers.authorization;
    usuario = jwt.decode(usuario);

    console.log(req.body);
    let produtos = req.body;
    let valores = [];
    
    produtos.forEach((item) => {
      valores.push(item.produto_id);
    })

    const soma = await connection('produtos')
      .where((builder) => builder.whereIn('produto_id', valores))
      .sum('preco')
      .first();

    const novaVenda = {
      total: soma.sum,
      desconto: 0,
      data_venda: new Date(),
      data_envio: null,
      custo_envio: null,
      prazo_entrega: null,
      rastreio: null,
      usuario_id: usuario.usuario.id,
      cupom_id: null,
      endereco_id: null,
    }

    const venda = await connection('vendas')
      .insert(novaVenda, 'venda_id');
    
    let preference = {
      items: [
        {
          title: `Venda #${venda}`,
          unit_price: soma.sum,
          quantity: 1,
        }
      ],
      statement_descriptor: 'WK3OUTLET',
      // notification_url: 'https://wk3-outlet-backend.herokuapp.com/checkout/teste/',
    };

    const response = await mercadopago.preferences.create(preference)
      .catch(function(error){
        return error;
      });

    let preference_id = response.body.id; 

    const atualizar = await connection('vendas')
      .where('venda_id', venda[0])
      .update('preference_id', preference_id);

    return response.body.init_point;
  },

  async atualizarVenda(data){
    let id_pagamento = data.data.id;
    console.log(`Pagamento identificado: ${id_pagamento}`);
  }
}