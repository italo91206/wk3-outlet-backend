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
      ]
    };

    const response = await mercadopago.preferences.create(preference)
      .catch(function(error){
        return error;
      });

    return response.body.init_point;
  }
}