import model from './acertoEstoqueModel';

export default {
  async handleAcertarEstoque(req){
    const acerto = await model.acertarEstoque(req);
    return acerto;
  },

  async handleListarEstoques(){
    const acertos = await model.listarAcertos();
    return acertos;
  },

  async handleAcertoPorUsuario(req){
    const acertos = await model.acertoPorUsuario(req);
    return acertos;
  }

}

