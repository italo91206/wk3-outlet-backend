import { Router } from 'express';
import service from '../../app/tamanhos/tamanhoService';

class TamanhoRouter {
  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get('/tamanhos', async (req, res) => {
      let dados;
      try{
        dados = await service.handleListarTamanhos();
        res.status(200).json(dados);
      }
      catch(err){
        res.status(400).json({ success: false, message: err.message });
      }
    });

    this.router.get('/tamanho', async(req, res) => {
      let dados;
      try {
        dados = await service.handleListarTamanho(req);
        res.status(200).json(dados);
      }
      catch(err){
        res.status(400).json({ success: false, message: err.message });
      }
    });

    this.router.delete('/deletar', async(req, res) => {
      let dados;
      try{
        dados = await service.handleDeletarTamanho(req);
        res.status(200).json({ success:true, data: dados });
      }
      catch(err){
        res.status(400).json({ success: false, message: err.message });
      }
    });

    this.router.put('/atualizar', async(req, res) => {
      let dados;
      try{
        dados = await service.handleAtualizarTamanho(req);
        res.status(200).json({ success: true, data: dados });
      }
      catch(err){
        res.status(200).json({ success: false, message: err.message });
      }
    });

    this.router.post('/novo', async(req, res) => {
      let dados;
      try{
        dados = await service.handleNovoTamanho(req);
        res.status(200).json({ success: true, data: dados });
      }
      catch(err){
        res.status(400).json({ success: false, message: err.message });
      }
    })
  }
}

export default new TamanhoRouter().router;






