import { Router } from 'express';
// import { middlewares } from '../middlewares';
import service from './../../app/checkout/checkoutService';

class CheckoutRouter {
  constructor() {
    this.router = Router();
    //this.middlewares();
    this.routes();
  }

  // middlewares(){
  //   this.router.use(middlewares);
  // }

  routes() {
    this.router.post('/notification', async (req, res) => {
      let dados;

      try {
        dados = await service.handleNotification(req);
        res.status(200).json({ success: true });
      }
      catch (err) {
        res.status(200).json({ success: false, message: err.message });
      }
    });

    this.router.post('/pagar', async (req, res) => {
      let dados;
      let { produtos, codigo_cupom } = req.body;
      let usuario = req.headers.authorization;

      try {
        dados = await service.handleRealizarVenda(produtos, codigo_cupom, usuario);
        res.status(200).json({ success: true, data: dados });
      }
      catch (err) {
        res.status(200).json({ success: false, message: err.message });
      }
    });
  }
}

export default new CheckoutRouter().router;
