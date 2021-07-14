import model from './corModel';

export default {
    async handleVerCores(){
        const cores = await model.getCores();
        return cores;
    }
}