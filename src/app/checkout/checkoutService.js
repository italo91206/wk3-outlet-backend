import model from './checkoutModel';

export default {
  async handleRealizarVenda(req){
    const venda = await model.realizarVenda(req);
    return venda;
  }
}