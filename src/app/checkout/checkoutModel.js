const connection = require('../../database/connection');
const mercadopago = require('mercadopago');
var jwt = require("jsonwebtoken");

import dotenv from 'dotenv';
dotenv.config();

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

export default {
  async realizarVenda(produtos, codigo_cupom, usuario) {

    // let usuario = req.headers.authorization;
    usuario = jwt.decode(usuario);

    // console.log(req.body);
    // let produtos = req.body;
    let valores = [];

    produtos.forEach((item) => {
      valores.push(item.produto_id);
    })

    const soma = await connection('produtos')
      .where((builder) => builder.whereIn('produto_id', valores))
      .sum('preco')
      .first();

    const cupom = await connection('cupons')
      .where('codigo', codigo_cupom)
      .where('is_enabled', true)
      .first();

    const cupom_is_valid = new Date() < cupom.validade ? true : false
    let desconto = 0;

    if(cupom_is_valid){
      if(cupom.is_percent)
        desconto = Math.abs(soma.sum * (cupom.valor / 100 - 1))
      else
        desconto = cupom.valor
    }

    const novaVenda = {
      total: soma.sum,
      desconto: desconto,
      data_venda: new Date(),
      data_envio: null,
      custo_envio: null,
      prazo_entrega: null,
      rastreio: null,
      usuario_id: usuario.usuario.id,
      cupom_id: cupom.codigo_cupom || null,
      endereco_id: null,
      status: 'pendente',
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
      notification_url: 'https://wk3-outlet-backend.herokuapp.com/checkout/notification/',
      back_urls: {
        success: `${process.env.APP_FRONT_URL}`
      }
    };

    const response = await mercadopago.preferences.create(preference)
      .catch(function (error) {
        return error;
      });

    let preference_id = response.body.id;

    await connection('vendas')
      .where('venda_id', venda[0])
      .update('preference_id', preference_id);

    return response.body.init_point;
  },

  async atualizarVenda(data) {
    let id_pagamento = data.body.data.id;
    let tipo = data.body.type;

    if (tipo == "payment") {
      const payment = await mercadopago.payment.findById(id_pagamento)
      console.log("payment", payment.body.id)

      if (payment.body.status == 'approved') {
        const order = await mercadopago.merchant_orders.findById(payment.body.order.id)
        console.log("order", order.body.id)
        console.log("preference", order.body.preference_id)

        await connection('vendas')
          .where('preference_id', order.body.preference_id)
          .update({ status: 'aprovado' })
      }
    }
  },
}
