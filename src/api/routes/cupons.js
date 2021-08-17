import { Router } from 'express';
import service from '../../app/cupom/cupomService';

class CupomRouter {
  constructor(){
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get('/cupons', async(req, res) => {
      let dados;
      try{
        dados = await service.handleVerCupons();
        res.status(200).json({ success: true, data: dados});
      }
      catch(err){
        res.status(200).json({ success: false, message: err.message });
      }
    });

    this.router.get('/cupom', async(req, res) => {
      let dados;
      try{
        dados = await service.handleVerCupom(req);
        res.status(200).json({ success: true, data: dados });
      }
      catch(err){
        res.status(200).json({ success: false, message: err.message });
      }
    });

    this.router.delete('/deletar', async(req, res) => {
      let dados;
      try{
        dados = await service.handleDeletarCupom(req);
        res.status(200).json({ success: true, data: dados });
      }
      catch(err){
        res.status(200).json({ success: false, message: err.message });
      }
    });

    this.router.put('/atualizar', async(req, res) => {
      let dados;
      try{
        dados = await service.handleAtualizarCupom(req);
        res.status(200).json({ success: true, data: dados });
      }
      catch(err){
        res.status(200).json({ success: false, message: err.message });
      }
    });

    this.router.post('/novo', async(req, res) => {
      let dados;
      try{
        dados = await service.handleNovoCupom(req);
        res.status(200).json({ success: true, data: dados});
      }
      catch(err){
        res.status(200).json({ success: false, message: err.message });
      }
    });
  }
}

export default new CupomRouter().router;