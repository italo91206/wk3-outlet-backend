import model from './categoriaModel';

export default {
  async handleVerCategorias(){
    const categorias = await model.verCategorias();
    return categorias;
  },
  async handleVerCategoria(req){
    const categoria = await model.verCategoria(req);
    return categoria;
  },
  async handleNovaCategoria(req){
    const nova = await model.novaCategoria(req);
    return nova;
  },
  async handleDeletarCategoria(req){
    const deletar = await model.deletarCategoria(req);
    return deletar;
  },
  async handleAtualizarCategoria(req){
    const atualizar = await model.atualizarCategoria(req);
    return atualizar;
  }
}