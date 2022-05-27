import { Router } from 'express';
import { middlewares } from '../middlewares';
import service from '../../app/relatorios/relatoriosService'

class RelatorioRouter {
  constructor(){
    this.router = Router();
    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.router.use(middlewares)
  }

  routes(){
    this.router.get('/produtos', async(req, res) => {
      let dados;

      try{
        dados = await service.handleGetProdutos()
        res.status(200).json({ success: true, data: dados })
      }
      catch(err){
        res.status(200).json({ success: false, message: err.message })
      }
    });

    this.router.get('/usuarios', async(req, res) => {
      let dados;

      try{
        dados = await service.handleGetUsuarios();
        res.status(200).json({ success: true, data: dados })
      }
      catch(err){
        res.status(200).json({ success: false, message: err.message })
      }
    });

    this.router.get('/vendas', async(req, res) => {
      let dados;

      try{
        dados = await service.handleGetVendas()
        res.status(200).json({ success: true, data: dados })
      }
      catch(err){
        res.status(200).json({ success: false, message: err.message })
      }
    })
  }
}

export default new RelatorioRouter().router;
