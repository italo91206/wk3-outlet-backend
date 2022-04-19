import { ConstraintViolationError } from 'objection';
import emailService from '../newsletter/emailService';
import model from './produtoModel';

export default {
  async handleVerProdutos() {
    const produtos = await model.listarProdutos();
    return produtos;
  },

  async handleTrazerProduto(req) {
    const { url } = req.query
    const produto = await model.getProduto(url);
    return produto;
  },

  async handleNovoProduto(req) {
    const novo = await model.novoProduto(req);
    return novo;
  },

  async handleDeletarProduto(req) {
    const deletar = await model.deletarProduto(req);
    return deletar;
  },

  async atualizarProduto(req) {
    const { produto } = req.body;
    const atualizar = await model.atualizarProduto(produto);
    return atualizar;
  },

  async handleGetUrlById(id) {
    const url = await model.getUrlById(id);
    return url;
  },

  async handleGetFilhos(id) {
    const filhos = await model.getFilhos(id);
    return filhos
  },

  async handleRemoverVariacao(req) {
    const remover = await model.removerVariacao(req);
    return remover;
  }
}
