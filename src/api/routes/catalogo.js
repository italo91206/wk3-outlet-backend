import { Router } from 'express';
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
    this.router.get('/produto', async (req, res) => {
      let dados;
      let { url } = req.query;
      try {
        dados = await service.handleGetProduto(url);
        res.status(200).json({ success: true, data: dados });
      }
      catch (err) {
        res.status(200).json({ success: false, message: err.message });
      }
    })
  }
}

export default new CatalogoRouter().router;