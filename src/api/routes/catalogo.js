import { Router } from 'express';
import { Console } from 'winston/lib/winston/transports';
import { middlewares } from '../middlewares';
import service from './../../app/catalogo/catalogoService';

class CatalogoRouter {
  constructor() {
    this.router = Router();
    // this.middlewares();
    this.routes();
  }

  // middlewares() {
  //   this.router.use(middlewares);
  // }

  routes() {
    this.router.get('/produto/:url', async (req, res) => {
      let dados;
      let { url } = req.params;

      try {
        dados = await service.handleGetProduto(url);
        res.status(200).json({ success: true, data: dados });
      }
      catch (err) {
        res.status(200).json({ success: false, message: err.message });
      }
    });

    this.router.get('/produtos', async(req, res) => {
      let dados;
      try{
        dados = await service.handleGetProdutos();
        res.status(200).json({ success: true, data: dados })
      }
      catch(err){
        res.status(200).json({ success: false, message: err.message });
      }
    });

    this.router.get('/cupom/:codigo', async(req, res) => {
      let dados;
      let { codigo } = req.params

      try{
        dados = await service.handleGetCupom(codigo);
        res.status(200).json({ success: true, data: dados })
      }
      catch(err){
        res.status(200).json({ success: false, message: err.message })
      }
    })
  }
}

export default new CatalogoRouter().router;
