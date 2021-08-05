import {
    CredentialsExistenteException,
    DataNotFoundException,
  } from '../../utils/exceptions';

const connection = require('../../database/connection');

export default {
    async getCores(req){
        const cores = await connection('cores')
            .select('*');

        return cores;
    },
    
    async getCor(req){
        const { id } = req.query;
        const cor = await connection('cores').where('cor_id', id).select('*').first();
        return cor;
    },

    async deletarCor(req){
        const { id } = req.query;
        const deletar = await connection('cores').where('cor_id', id).del('cor_id');
        return deletar;
    },

    async novaCor(req){
        const { cor } = req.body;
        const novo = await connection('cores').insert(cor, 'cor_id');
        return novo;
    },

    async atualizarCor(req){
        const { cor } = req.body;
        const atualizar = await connection('cores').where('cor_id', cor.cor_id).update(cor, 'cor_id');
        return atualizar;
    }
}