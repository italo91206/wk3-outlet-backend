import {DataNotFoundException} from '../../utils/exceptions';

const connection = require('../../database/connection');

export default {
    async listarModelos(){
        const modelos = await connection('modelos').select('*')

        if (!modelos.length) {
            throw new DataNotFoundException('Nenhum dado encontrado');
        }

        console.log({modelos})
        return modelos;
    },

    async deletarModelo(req){
        const id = req.body.id;
        

        const modelo = await connection('modelos')
            .select('*')
            .where('id', id)
            .first();

        if (!modelo) {
            throw new DataNotFoundException('Nenhum dado encontrado');
        }

        await connection('modelos').where('id', id).del();

        return modelo;
    },

    async editarModelo(req){
        const body = req.body;
        const id = req.body.id
        let modelo;

        modelo = await connection('modelos')
            .select('*')
            .where('id', id)
            .first();

        console.log(modelo)

        if (!modelo) {
            throw new DataNotFoundException('Nenhum dado encontrado');
        }


        await connection('modelos').update(body).where('id', body.id);

        return {
            success: true,
            message: 'Modelo atualizado com sucesso'
        }
    },
    
    async criarModelo(req){
        const modelo = req.body;

        const [id] = await connection('modelos')
            .returning('id')
            .insert(modelo)

        return {
            success: true,
            message: 'Modelo inserido com sucesso',
            id: id
        }
    }
}