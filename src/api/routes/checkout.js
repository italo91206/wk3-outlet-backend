import { Router } from 'express';
// import { middlewares } from '../middlewares';
import service from './../../app/checkout/checkoutService';

class CheckoutRouter {
  constructor(){
    this.router = Router();
    //this.middlewares();
    this.routes();
  }

  // middlewares(){
  //   this.router.use(middlewares);
  // }

  routes(){
    this.router.post('/teste', async(req, res) => {
      let dados = req.body;
      try {
        console.log(dados);
        res.status(200).json({ success: true });
      }
      catch(err){
        res.status(200).json({ success: false, message: err.message });
      }
    });

    this.router.post('/pagar', async(req, res) => {
      let dados;
      try {
        dados = await service.handleRealizarVenda(req);
        res.status(200).json({ success: true, data: dados });
      }
      catch(err){
        res.status(200).json({ success: false, message: err.message });
      }
    })
  }
}

export default new CheckoutRouter().router;