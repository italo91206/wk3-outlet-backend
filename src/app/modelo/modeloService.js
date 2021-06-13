import model from './modeloModel';

export default {
    async handleVerModelos(){
        const modelos = await model.listarModelos();
        return modelos;
    },

    async handleDeleteModelo(req){
        const modelo = await model.deletarModelo(req);
        return modelo;
    },

    async handleEditarModelo(req){
        const modelo = await model.editarModelo(req);
        return modelo;
    },

    async handleInsert(req){
        const modelo = await model.criarModelo(req);
        return modelo;
    }
}