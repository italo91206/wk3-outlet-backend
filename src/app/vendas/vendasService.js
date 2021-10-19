import model from './vendasModel';

export default {
  async handleListarVendas(){
    const vendas = await model.listarVendas();
    return vendas;
  },

  async handleRecuperarVenda(req){
    const venda = await model.recuperarVenda(req);
    return venda;
  }
}