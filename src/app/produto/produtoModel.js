import {DataNotFoundException} from '../../utils/exceptions';

const connection = require('../../database/connection');

export default {
    async listarProdutos(){
        const produtos = await connection('produtos').select('*')

        if(!produtos.length)
            throw new DataNotFoundException('Nenhum dado encontrado');
        
        return produtos;
    }
}