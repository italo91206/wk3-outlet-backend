import model from './checkoutModel';

export default {
  async handleRealizarVenda(produtos, codigo_cupom, usuario){
    const venda = await model.realizarVenda(produtos, codigo_cupom, usuario);
    return venda;
  },

  async handleNotification(req){
    const notificacao = await model.atualizarVenda(req);
    return notificacao;
  },


}
