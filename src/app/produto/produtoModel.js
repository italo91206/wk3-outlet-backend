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
    }
}