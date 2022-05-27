const connection = require('../../database/connection')

export default {
  async getProdutos(){
    let produtos = await connection('produtos').select('*')

    for(var produto of produtos){
      const total_vendas = await connection('produtos_vendas')
        .where('produto_id', produto.produto_id )
        .sum({ total_unitario: 'quantidade' })
        .sum({ total_valor: 'valor_total' })

      produto.total_unitario = total_vendas[0].total_unitario
      produto.total_valor = total_vendas[0].total_valor
    }

    return produtos;
  },

  async getUsuarios(){
    let usuarios = await connection('perfis').select('*')

    for(var usuario of usuarios){
      const vendas = await connection('vendas')
        .where('usuario_id', usuario.id)
        .innerJoin('produtos_vendas', 'produtos_vendas.venda_id', 'vendas.venda_id')
        .sum({ total_unitario: 'quantidade' })
        .sum({ total_valor: 'valor_total' })

      usuario.total_unitario = vendas[0].total_unitario
      usuario.total_valor = vendas[0].total_valor
    }

    return usuarios
  },

  async getVendas(){
    let vendas = await connection('vendas').select('*')

    for(var venda of vendas){
      const usuario = await connection('perfis')
        .where('id', venda.usuario_id)
        .select('nome', 'sobrenome')
      venda.cliente = `${usuario[0].nome} ${usuario[0].sobrenome}`

      const produto_vendas = await connection('vendas')
        .innerJoin('produtos_vendas', 'produtos_vendas.venda_id', 'vendas.venda_id')
        .innerJoin('produtos', 'produtos.produto_id', 'produtos_vendas.produto_id')
        .sum({ custo: 'custo' })
        .sum({ lucro: 'lucro' })

      venda.custo = produto_vendas[0].custo
      venda.lucro = produto_vendas[0].lucro
    }

    // período,
    // produto,
    // categoria,
    // estoque,

    return vendas;
  }
}
