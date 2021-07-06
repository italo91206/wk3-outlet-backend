import model from './produtoModel';

export default {
    async handleVerProdutos(){
        const produtos = await model.listarProdutos();
        return produtos;
    }
}