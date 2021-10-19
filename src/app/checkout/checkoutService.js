import model from './checkoutModel';

export default {
  async handleRealizarVenda(req){
    const venda = await model.realizarVenda(req);
    return venda;
  },

  async handleNotification(data){
    const notificacao = await model.atualizarVenda(req);
  }
}