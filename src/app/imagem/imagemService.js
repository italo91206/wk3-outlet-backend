import model from './imagemModel';

export default {
    async handleGravarEnderecos(nomes, id){
        const enderecos = await model.gravarEnderecos(nomes, id);
        return enderecos;
    },

    async handleRecuperarEnderecos(id){
        const enderecos = await model.recuperarEnderecos(id);
        return enderecos;
    }
}