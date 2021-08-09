import model from './cupomModel';

export default {
  async handleVerCupons(){
    const cupons = await model.getCupons();
    return cupons;
  },

  async handleVerCupom(req){
    const cupom = await model.getCupom(req);
    return cupom;
  },

  async handleDeletarCupom(req){
    const deletar = await model.deletarCupom(req);
    return deletar;
  },

  async handleAtualizarCupom(req){
    const atualizar = await model.atualizarCupom(req);
    return atualizar;
  },

  async handleNovoCupom(req){
    const novo = await model.novoCupom(req);
    return novo;
  }
}