import model from './produtoModel';

export default {
    async handleVerProdutos(){
        const produtos = await model.listarProdutos();
        return produtos;
    },

    async handleTrazerProduto(req){
        const produto = await model.getProduto(req);
        return produto;
    },
    
    async handleNovoProduto(req){
        const novo = await model.novoProduto(req);
        return novo;
    },

    async handleDeletarProduto(req){
        const deletar = await model.deletarProduto(req);
        return deletar;
    },

    async atualizarProduto(req){
        const atualizar = await model.atualizarProduto(req);
        return atualizar;
    },

    async handleGetUrlById(id){
        const url = await model.getUrlById(id);
        return url;
    },

    async handleGetFilhos(id){
        const filhos = await model.getFilhos(id);
        return filhos
    },
}