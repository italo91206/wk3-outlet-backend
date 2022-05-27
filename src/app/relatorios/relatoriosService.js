import model from './relatoriosModel';

export default {
  async handleGetProdutos(){
    let vendas = await model.getProdutos()
    return vendas;
  },

  async handleGetUsuarios(){
    let usuarios = await model.getUsuarios();
    return usuarios
  },

  async handleGetVendas(){
    let vendas = await model.getVendas();
    return vendas;
  }
}
