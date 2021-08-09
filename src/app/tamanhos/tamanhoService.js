import model from './tamanhoModel';

export default {
    async handleListarTamanhos(){
        const tamanhos = await model.listarTamanhos();
        return tamanhos;
    },
    async handleListarTamanho(req){
        const tamanho = await model.listarTamanho(req);
        return tamanho;
    },
    async handleDeletarTamanho(req){
        const deletar = await model.deletarTamanho(req);
        return deletar;
    },
    async handleAtualizarTamanho(req){
        const atualizar = await model.atualizarTamanho(req);
        return atualizar;
    },
    async handleNovoTamanho(req){
        const novo = await model.novoTamanho(req);
        return novo;
    }
}