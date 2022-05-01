import model from './catalogoModel';

export default {
  async handleGetProduto(url) {
    const produto = await model.getProduto(url);
    return produto;
  },

  async handleGetProdutos() {
    const produtos = await model.getProdutos();
    return produtos;
  },

  async handleGetCupom(codigo){
    const cupom = await model.getCupom(codigo);
    return cupom;
  }
}
