import model from './imagemModel';

export default {
  async handleGravarEnderecos(nomes, id) {
    const enderecos = await model.gravarEnderecos(nomes, id);
    return enderecos;
  },

  async handleRecuperarEnderecos(id) {
    const enderecos = await model.recuperarEnderecos(id);
    return enderecos;
  },

  async handleSalvarImagens(files_name, id) {
    const imagens = await model.salvarImagens(files_name, id);
    return imagens;
  },

  async handleRemoverImagem(id) {
    const imagem = await model.removerImagem(id);
    return imagem;
  }
}
