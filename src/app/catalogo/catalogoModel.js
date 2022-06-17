const connection = require('../../database/connection');

export default {
  async getProduto(url) {
    const existe = await connection('produtos')
      .where('sku', url)
      .first();

    if(existe){
      const produto = await connection('produtos')
        .where('sku', url)
        .first()
        .then(async function(produto){
          const produtoComJoin = await connection('produtos')
            .where('produto_id', produto.produto_id)
            .leftJoin('modelos', 'produtos.modelo_id', 'modelos.modelo_id')
            .leftJoin('marcas', 'produtos.marca_id', 'marcas.marca_id')
            .leftJoin('categorias', 'produtos.categoria_id', 'categorias.categoria_id')
            .select('*', 'produtos.is_enabled')
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

      if(produto.is_enabled)
        return produto;
      else
        throw { message: "Produto não encontrado." }
    }
    else
      throw { message: "Produto não existe." }
  },

  async getProdutos(query){
    let produtos = await connection('produtos')
      .where({...query})
      .then(async function(){
        const produtoComJoin = await connection('produtos')
          .leftJoin('modelos', 'produtos.modelo_id', 'modelos.modelo_id')
          .leftJoin('marcas', 'produtos.marca_id', 'marcas.marca_id')
          .leftJoin('categorias', 'produtos.categoria_id', 'categorias.categoria_id')
          .select(
            'produtos.*',
            'modelos.modelo',
            'marcas.marca',
            'categorias.nome_categoria',
            'categorias.url',
            'categorias.categoria_id'
          )
        return produtoComJoin
      })
      .then(async function(produtos){
        for(let i = 0; i < produtos.length; i++){
          const variacoes = await connection('variacoes')
            .where('produto_id', produtos[i].produto_id)
            .leftJoin('cores', 'variacoes.cor_id', 'cores.cor_id')
            .leftJoin('tamanhos', 'variacoes.tamanho_id', 'tamanhos.tamanho_id')
            .select(
              'variacoes.variacao_id',
              'variacoes.quantidade',
              'cores.cor',
              'cores.hexa',
              'tamanhos.tamanho'
            );
          produtos[i].variacoes = variacoes
        }
        return produtos;
      })
      .then(async function(produtos){
        for(let i = 0; i< produtos.length; i++){
          const imagens = await connection('imagens')
            .where('produto_id', produtos[i].produto_id)
            .select('*');
          produtos[i].imagens = imagens;
        }
        return produtos;
      })

    if(query.categoria_id){
      produtos = produtos.filter((p) => {
        return p.categoria_id == query.categoria_id
      })
    }

    return produtos
  },

  async getCupom(codigo){
    const cupom = await connection('cupons')
      .where('codigo', codigo)
      .first();

    // console.log("cupom", cupom)

    if(cupom != undefined){
      if(cupom.is_enabled || new Date() < cupom.validade)
        return cupom;
      else
        throw { message: "Este cupom não é mais válido." }
    }

    throw { message: "Não foi encontrado nenhum cupom." }
  }
}
