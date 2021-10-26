const connection = require('../../database/connection');

export default {
  async getProduto(url) {
    const produto = await connection('produtos')
      .where('url', url)
      .first()
      .then(async function(produto){
        const produtoComJoin = await connection('produtos')
          .where('produto_id', produto.produto_id)
          .leftJoin('modelos', 'produtos.modelo_id', 'modelos.modelo_id')
          .leftJoin('marcas', 'produtos.marca_id', 'marcas.marca_id')
          .leftJoin('categorias', 'produtos.categoria_id', 'categorias.categoria_id')
          .select('*')
          .first();
        return produtoComJoin
      })
      .then(async function(produto){
        produto.variacoes = [];
        
        const filhos = await connection('variacoes')
          .where('produto_id', produto.produto_id)
          .leftJoin('cores', 'variacoes.cor_id', 'cores.cor_id')
          .leftJoin('tamanhos', 'variacoes.tamanho_id', 'tamanhos.tamanho_id')
          .select(
            'variacoes.variacao_id',
            'variacoes.quantidade',
            'cores.cor',
            'cores.hexa',
            'tamanhos.tamanho'
          )

        produto.variacoes = filhos;
        return produto;
      })
      .then(async function(produto){
        const imagens = await connection('imagens')
          .where('produto_id', produto.produto_id)
          .select('*');
        produto.imagens = imagens;
        return produto;
      })
    return produto;  
  }
}