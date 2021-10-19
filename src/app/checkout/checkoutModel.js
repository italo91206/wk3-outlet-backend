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

    // console.log(req.body);
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
    let id_pagamento = data.body.data.id;
    let tipo_evento = data.body.action;

    console.log(`Pagamento identificado: ${id_pagamento}`);
    console.log( `Tipo de evento: ${tipo_evento}`);

    if(tipo_evento == 'payment.created'){
      let order_id = await this.pagamentoCriado(id_pagamento)
        .then((order_id) => { return order_id });

      // console.log(order_id)
      if(order_id.status == 'approved'){
        let preference_id = await this.procurarOrdem(order_id.order.id)
          .then((preference_id) => { return preference_id });
        
        const response = await connection('vendas')
          .where('preference_id', preference_id)
          .update({ status: 'aprovado' })
      }
      // console.log(`payment_id: ${id_pagamento}`)
      // console.log(`order_id: ${order_id}`)
      // console.log(`preference_id: ${preference_id}`)
    }
  },

  async pagamentoCriado(id_pagamento){
    const response = await mercadopago.payment.findById(id_pagamento)
      .then((response) => {
        response = response.body;
        return response;
      })
    return response;
  },

  async procurarOrdem(order_id){
    const response = await mercadopago.merchant_orders.findById(order_id)
      .then((response) => {
        response = response.body.preference_id;
        return response;
      });
    return response;
  }
}