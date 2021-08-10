const connection = require('../../database/connection');

export default {
  async acertarEstoque(req){
    const {produto} = req.body;
    const {usuario} = req.body;
    const {motivo} = req.body;

    // console.log(produto);
    // console.log(usuario);

    let antes = await connection('produtos')
      .where('produto_id', produto.produto_id )
      .select('estoque')
      .first();

    antes = antes.estoque;
    let novo = produto.estoque;

    let novoAcerto = {
      valor_anterior: parseInt(antes, 10),
      valor_novo: parseInt(novo, 10),
      data: new Date(),
      usuario_id: usuario,
      produto_id: produto.produto_id,
      motivo_id: motivo
    }

    let acerto = await connection('acerto_estoque')
      .insert(novoAcerto, 'acerto_id');

    // console.log(novoAcerto);
    return acerto;
  },

  async listarAcertos(){
    const acertos = await connection('acerto_estoque')
      .innerJoin('produtos', 'acerto_estoque.produto_id', 'produtos.produto_id')
      .innerJoin('perfis', 'acerto_estoque.usuario_id', 'perfis.id')
      .innerJoin('motivos', 'acerto_estoque.motivo_id', 'motivos.motivo_id')
      .select(
        'acerto_estoque.data',
        'motivos.motivo',
        'produtos.nome', 'produtos.nome as produto',
        'acerto_estoque.valor_anterior',
        'acerto_estoque.valor_novo',
        'perfis.nome', 'perfis.nome as usuario'
      );
    return acertos;
  }
}