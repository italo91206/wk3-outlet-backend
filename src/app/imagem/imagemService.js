import model from './imagemModel';

export default {
    async handleGravarEnderecos(nomes, id){
        const enderecos = await model.gravarEnderecos(nomes, id);
        return enderecos;
    },

    async handleRecuperarEnderecos(id){
        const enderecos = await model.recuperarEnderecos(id);
        return enderecos;
    },

    async handleSalvarImagens(files, id){
        const imagens = await model.salvarImagens(files, id);
        return imagens;
    }
}