import model from './catalogoModel';

export default {
  async handleGetProduto(url) {
    const produto = await model.getProduto(url);
    return produto;
  },

  async handleGetProdutos(search_type, search_id, search_query) {
    let query = { is_enabled: true }

    if(search_type == 'category'){
      query.categoria_id = search_id
      // query.nome_categoria = search_query
    }

    const produtos = await model.getProdutos(query);
    return produtos;
  },

  async handleGetCupom(codigo){
    const cupom = await model.getCupom(codigo);
    return cupom;
  }
}
