import model from './vendasModel';

export default {
  async handleListarVendas(){
    const vendas = await model.listarVendas();
    return vendas;
  },

  async handleRecuperarVenda(venda_id){
    const venda = await model.recuperarVenda(venda_id);
    return venda;
  },

  async handleCancelarVenda(id_venda){
    const venda_cancelada = await model.cancelarVenda(id_venda);
    return venda_cancelada;
  },
}
