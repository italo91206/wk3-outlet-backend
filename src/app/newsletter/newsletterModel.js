const connection = require('../../database/connection');

export default {
  async cadastroRepetido(sku, produto_id, cliente_email, perfil_id){
    const cadastro_newsletter = await connection('newsletter')
      .where('sku', sku)
      .where('produto_id', produto_id)
      .where('cliente_email', cliente_email)
      .where('perfil_id', perfil_id)
      .first();

    return cadastro_newsletter == undefined ? false : true
  },
  async cadastrarNewsletter(req) {
    const { sku, produto_id, email } = req.body;
    // console.log({ sku, produto_id, email })
    let cliente_email = email;

    const perfil = await connection('perfis')
      .where('email', email)
      .select('id')
      .first();

    let perfil_id = perfil.id

    let repetido = await this.cadastroRepetido(sku, produto_id, cliente_email, perfil_id)
    console.log("repetido", repetido)

    if(!repetido){
      const inserir = await connection('newsletter')
        .insert({ sku, produto_id, cliente_email, perfil_id }, 'newsletter_id')
      return inserir;
    }
    else
      throw { message: "E-mail já cadastrado para este produto" }
  },
  async getByUser(req){
    const { perfil_id } = req.params
    const cadastros = await connection('newsletter')
      .where('perfil_id', perfil_id)
      .then(async function(){
        const cadastrosComJoin = await connection('newsletter')
          .leftJoin('produtos', 'newsletter.produto_id', 'produtos.produto_id')
          .select(
            'newsletter.newsletter_id',
            'newsletter.cliente_email',
            'produtos.sku',
            'produtos.nome_produto',
          )
        return cadastrosComJoin
      })

    // console.log("cadastros", cadastros)

    return cadastros;
  },
  async deletarCadastro(req){
    const { newsletter_id } = req.params;
    const deletar = await connection('newsletter')
      .where('newsletter_id', newsletter_id)
      .del();

    return deletar;
  }
}
