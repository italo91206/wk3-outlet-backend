import model from './corModel';

export default {
    async handleVerCores(){
        const cores = await model.getCores();
        return cores;
    },

    async handleGetCor(req){
        const cor = await model.getCor(req);
        return cor;
    },

    async handleDeletarCor(req){
        const deletar = await model.deletarCor(req);
        return deletar;
    },

    async handleNovaCor(req){
        const novo = await model.novaCor(req);
        return novo;
    },

    async handleAtualizarCor(req){
        const atualizar = await model.atualizarCor(req);
        return atualizar;
    }
}