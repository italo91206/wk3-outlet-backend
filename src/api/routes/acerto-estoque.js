import { Router } from 'express';
import service from '../../app/acerto-estoque/acertoEstoqueService';

class AcertoEstoqueRouter { 
  constructor(){
    this.router = Router();
    this.routes();
  }

  routes(){
    this.router.post('/acertar', async(req, res) => {
      let dados;
      try{
        dados = await service.handleAcertarEstoque(req);
        res.status(200).json(dados);
      }
      catch(err){
        res.status(400).json({ success: false, message: err.message });
      }
    });

    this.router.get('/acertos', async(req, res) => {
      let dados;
      try{
        dados = await service.handleListarEstoques();
        res.status(200).json(dados);
      }
      catch(err){
        res.status(400).json({ success: false, message: err.message });
      }
    })
  }
}

export default new AcertoEstoqueRouter().router;