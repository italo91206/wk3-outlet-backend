import { Router } from 'express';
import service from '../../app/motivo/motivoService';

class MotivosRouter {
  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get('/motivos', async(req, res) => {
      let dados;
      try{
        dados = await service.handleVerMotivos();
        res.status(200).json({ success: true, data: dados });
      }
      catch(err){
        res.status(200).json({ success: false, message: err.message });
      }
    });

    this.router.get('/motivo', async(req, res) => {
      let dados;
      try{
        dados = await service.handleVerMotivo(req);
        res.status(200).json({ success: true, data: dados });
      }
      catch(err){
        res.status(200).json({ success: false, message: err.message });
      }
    });

    this.router.put('/atualizar', async(req, res) => {
      let dados;
      try{
        dados = await service.handleAtualizar(req);
        res.status(200).json({ success: true, data: dados });
      }
      catch(err){
        res.status(200).json({ success: false, message: err.message });
      }
    });

    this.router.delete('/deletar', async(req, res) => {
      let dados;
      try{
        dados = await service.handleDeletar(req);
        res.status(200).json({ success: true, data: dados });
      }
      catch(err){
        res.status(200).json({ success: false, message: err.message });
      }
    });

    this.router.post('/novo', async(req, res) => {
      let dados;
      try{
        dados = await service.handleNovoMotivo(req);
        res.status(200).json({ success: true, data: dados });
      }
      catch(err){
        res.status(200).json({ success: false, message: err.message });
      }
    })
  }
}

export default new MotivosRouter().router;