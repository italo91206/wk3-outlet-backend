import { Router } from 'express';
import { middlewares } from '../middlewares';
import service from './../../app/vendas/vendasService';

class VendasRouter {
  constructor() {
    this.router = Router();
    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.router.use(middlewares);
  }

  routes(){
    this.router.get('/vendas', async(req, res) => {
      let dados;
      try{
        dados = await service.handleListarVendas();
        res.status(200).json({ success: true, data: dados});
      }
      catch(err){
        res.status(200).json({ success: false, message: err.message });
      }
    });

    this.router.get('/venda/:venda_id', async(req, res) => {
      let dados;
      let { venda_id } = req.params;

      try{
        dados = await service.handleRecuperarVenda(venda_id);
        res.status(200).json({ success: true, data: dados });
      }
      catch(err){
        res.status(200).json({ success: false, message: err.message });
      }
    });

    this.router.delete('/cancelar/:id_venda', async(req, res) => {
      let { id_venda } = req.params;
      let dados;

      try {
        dados = await service.handleCancelarVenda(id_venda);
        res.status(200).json({ success: true, data: dados });
      }
      catch(err){
        res.status(200).json({ success: false, message: err.message})
      }
    })
  }
}

export default new VendasRouter().router;
