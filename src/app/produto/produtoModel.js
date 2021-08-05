import {DataNotFoundException} from '../../utils/exceptions';

const connection = require('../../database/connection');

export default {
    async listarProdutos(){
        const produtos = await connection('produtos').select('*')

        if(!produtos.length)
            throw new DataNotFoundException('Nenhum dado encontrado');
        
        return produtos;
    },

    async getProduto(req){
        const { url } = req.query;
        const produto = await connection('produtos').select('*').where('url', url).first();
        return produto;
    },

    async novoProduto(req){
        let { produto } = req.body;
        produto.custo = parseFloat(produto.custo);
        produto.peso = parseFloat(produto.peso);
        produto.preco = parseFloat(produto.preco);
        produto.estoque = parseInt(produto.estoque, 10);

        const novo = await connection('produtos').insert(produto, 'produto_id');
        console.log( produto );

        return novo;
    },

    async deletarProduto(req){
        const { id } = req.body;
        const deletar = await connection('produtos').where('produto_id', id).del('produto_id');

        return deletar;
    },

    async atualizarProduto(req){
        const { produto } = req.body;
        const atualizar = await connection('produtos').where('produto_id', produto.produto_id).update(produto, 'produto_id');

        return atualizar;
    }
}