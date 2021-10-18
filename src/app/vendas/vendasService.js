import model from './vendasModel';

export default {
  async handleListarVendas(){
    const vendas = await model.listarVendas();
    return vendas;
  }
}