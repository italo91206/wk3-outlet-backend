import model from './catalogoModel';

export default {
  async handleGetProduto(url) {
    const produto = await model.getProduto(url);
    return produto;
  },

  async handleGetProdutos() {
    const produtos = await model.getProdutos();
    return produtos;
  }
}
