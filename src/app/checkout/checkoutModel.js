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

    usuario = jwt.decode(usuario);
    // console.log("usuario", usuario)
    let produtos_id = [];
    let cupom = codigo_cupom || false
    let desconto = 0;
    let items_to_push = [];

    produtos.forEach((item) => {
      produtos_id.push(item.produto_id);
    })

    const real_simple_products = await connection('produtos')
      .where((builder) => builder.whereIn('produto_id', produtos_id))
      .select('produto_id', 'nome_produto', 'estoque', 'preco')

    // console.log("real_simple_products", real_simple_products)

    real_simple_products.forEach((p) => {
      let product_from_request = produtos.filter((pfilter) => {
        if(pfilter.produto_id == p.produto_id)
          return pfilter
      })
      items_to_push.push({
        title: p.nome_produto,
        description: p.descricao,
        category_id: "fashion",
        quantity: product_from_request[0].quantidade,
        currency_id: "BRL",
        unit_price: p.preco,
        id: p.produto_id,
        statement_descriptor: 'WK3OUTLET'
      })
    })

    if(cupom){
      cupom = await connection('cupons')
        .where('codigo', codigo_cupom)
        .where('is_enabled', true)
        .first();
      const cupom_is_valid = new Date() < cupom.validade ? true : false
      if(cupom_is_valid){
        if(cupom.is_percent)
          desconto = soma.sum * Math.abs((cupom.valor / 100) - 1)
        else
          desconto = cupom.valor
      }
    }

    var soma = 0
    items_to_push.forEach((i) => {
      soma += i.unit_price * i.quantity
    })

    const novaVenda = {
      total: soma,
      desconto: desconto,
      data_venda: new Date(),
      data_envio: null,
      custo_envio: null,
      prazo_entrega: null,
      rastreio: null,
      usuario_id: usuario.usuario.id,
      cupom_id: cupom ? cupom.codigo_cupom : null,
      endereco_id: null,
      status: 'pendente',
    }

    const venda_id = await connection('vendas')
      .insert(novaVenda, 'venda_id');

    items_to_push.forEach(async (i) => {
      // console.log({
      //   quantidade: i.quantity,
      //   desconto_unitario: 0,
      //   valor_total: i.quantity * i.unit_price,
      //   venda_id: venda_id[0],
      //   produto_id: i.id
      // })

      await connection('produtos_vendas')
        .insert({
          quantidade: i.quantity,
          desconto_unitario: 0,
          valor_total: i.quantity * i.unit_price,
          venda_id: venda_id[0],
          produto_id: i.id
        })
    })

    let preference = {
      items: items_to_push,
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
      .where('venda_id', venda_id[0])
      .update('preference_id', preference_id);

    return { url: response.body.init_point, id_venda: venda_id[0] };
  },

  async atualizarVenda(data) {
    let id_pagamento = data.body.data.id;
    let tipo = data.body.type;

    console.log(data.body)

    if (tipo == "payment") {
      const payment = await mercadopago.payment.findById(id_pagamento)
      console.log("Procurando por um payment: ", payment.body.id)

      if (payment.body.status == 'approved') {
        console.log("Pagamento aprovado: ", payment.body.id)
        const order = await mercadopago.merchant_orders.findById(payment.body.order.id)
        console.log("order", order.body.id)
        console.log("preference", order.body.preference_id)

        await connection('vendas')
          .where('preference_id', order.body.preference_id)
          .update({ status: 'aprovado' })
      }
      else if(payment.body.status == 'refunded'){
        console.log("Pagamento reembolsado: ", payment.body.id)
        const order = await mercadopago.merchant_orders.findById(payment.body.order.id)
          console.log("order", order.body.id)
          console.log("preference", order.body.preference_id)

          await connection('vendas')
            .where('preference_id', order.body.preference_id)
            .update({ status: 'reembolsado' })
      }
    }
  },
}
