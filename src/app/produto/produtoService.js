import model from './produtoModel';

export default {
    async handleVerProdutos(){
        const produtos = await model.listarProdutos();
        return produtos;
    },

    async handleTrazerProduto(req){
        const produto = await model.getProduto(req);
        return produto;
    }
}