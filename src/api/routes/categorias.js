import { Router } from 'express';
import { middlewares } from '../middlewares';
import service from './../../app/categorias/categoriaService';

class CategoriasRouter {
  constructor() {
    this.router = Router();
    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.router.use(middlewares);
  }

  routes(){
    this.router.get('/categorias', async(req, res) => {
      let dados;
      try{
        dados = await service.handleVerCategorias();
        res.status(200).json({ success: true, data: dados});
      }
      catch(err){
        res.status(200).json({ success: false, message: err.message });
      }
    });

    this.router.get('/categoria/:id', async(req, res) => {
      let dados;
      try{
        dados = await service.handleVerCategoria(req);
        res.status(200).json({ success: true, data: dados});
      }
      catch(err){
        res.status(200).json({ success: false, message: err.message });
      }
    });

    this.router.post('/novo', async(req, res) => {
      let dados;
      try{
        dados = await service.handleNovaCategoria(req);
        res.status(200).json({ success: true, data: dados});
      }
      catch(err){
        res.status(200).json({ success: false, message: err.message });
      }
    });

    this.router.delete('/deletar/:id', async(req, res) => {
      let dados;
      try{
        dados = await service.handleDeletarCategoria(req);
        res.status(200).json({ success: true, data: dados});
      }
      catch(err){
        res.status(200).json({ success: false, message: err.message });
      }
    });

    this.router.put('/atualizar', async(req, res) => {
      let dados;
      try{
        dados = await service.handleAtualizarCategoria(req);
        res.status(200).json({ success: true, data: dados});
      }
      catch(err){
        res.status(200).json({ success: false, message: err.message });
      }
    });
  }
}

export default new CategoriasRouter().router;