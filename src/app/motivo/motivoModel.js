const connection = require('../../database/connection');

export default {
    async listarMotivos(){
        const motivos = await connection('motivos').select('*');
        return motivos;
    },

    async deletarMotivo(req){
        const { id } = req.query;
        const deletar = await connection('motivos').where('motivo_id', id).del('motivo_id');

        return deletar;
    },

    async atualizarMotivo(req){
        const { motivo } = req.body;

        const atualizar = await connection('motivos')
            .where('motivo_id', motivo.motivo_id)
            .update(motivo, 'motivo_id');

        return atualizar;
    },

    async verMotivo(req){
        const { id } = req.query;
        const motivo = await connection('motivos').select('*').where('motivo_id', id).first();

        return motivo;
    },

    async novoMotivo(req){
        const { motivo } = req.body;
        const novo = await connection('motivos').insert(motivo, 'motivo_id');
        
        return novo;
    }
}