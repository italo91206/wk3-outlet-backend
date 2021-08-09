import model from './motivoModel';

export default {
    async handleVerMotivos(){
        const motivos = await model.listarMotivos();
        return motivos;
    },

    async handleDeletar(req){
        const motivo = await model.deletarMotivo(req);
        return motivo;
    },

    async handleAtualizar(req){
        const motivo = await model.atualizarMotivo(req);
        return motivo;
    },

    async handleVerMotivo(req){
        const motivo = await model.verMotivo(req);
        return motivo;
    },

    async handleNovoMotivo(req){
        const motivo = await model.novoMotivo(req);
        return motivo;
    }
}