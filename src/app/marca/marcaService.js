import model from './marcaModel';

export default {
    async handleVerMarcas(){
        const marcas = await model.listarMarcas();
        return marcas;
    },

    async handleDeleteMarca(req){
        const marca = await model.deletarMarca(req);
        return marca;
    },

    async handleEditarMarca(req){
        const marca = await model.editarMarca(req);
        return marca;
    },

    async handleInsert(req){
        const marca = await model.criarMarca(req);
        return marca;
    }

}