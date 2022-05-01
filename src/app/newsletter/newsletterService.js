import model from './newsletterModel';

export default {
  async handleCadastrar(req) {
    const cadastro = await model.cadastrarNewsletter(req);
    return cadastro;
  },

  async handleGetByUser(req){
    const cadastros = await model.getByUser(req);
    return cadastros;
  },

  async handleDelete(req){
    const deleted = await model.deletarCadastro(req);
    return deleted;
  }
}
