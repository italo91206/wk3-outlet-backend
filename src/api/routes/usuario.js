import { Router } from 'express';
import service from '../../app/usuario/usuarioService';

/** Router Usuario */
class UsuarioRouter {
  constructor() {
    this.router = Router();
    this.routes();
  }
  routes() {
    this.router.get('/usuarios', async (req, res) => {
      let dados;
      try {
        dados = await service.handleListarUsuarios();
        res.status(200).json({ success: true, data: dados});
      }
      catch(err){
        res.status(200).json({ success: false, message: err.message });
      }
    });

    this.router.get('/usuario', async (req, res) => {
      let dados;
      try{
        dados = await service.handleListarUsuario(req);
        res.status(200).json({ success: true, data: dados });
      }
      catch(err){
        res.status(200).json({ success: false, message: err.message });
      }
    });

    this.router.post('/novo', async (req, res) => {
      let dados;
      try{
        dados = await service.handleNovoUsuario(req);
        res.status(200).json({ success: true, data: dados });
      }
      catch(err){
        res.status(200).json({ success: false, message: err.message });
      }
    });

    this.router.delete('/deletar', async (req, res) => {
      let dados;
      try{
        dados = await service.handleDeletarUsuario(req);
        res.status(200).json({ success: true, data: dados });
      }
      catch(err){
        res.status(200).json({ success: false, message: err.message });
      }
    });

    this.router.put('/editar', async(req, res) => {
      let dados;
      try{
        dados = await service.handleAtualizarUsuario(req);
        res.status(200).json({ success: true, data: dados });
      }
      catch(err){
        res.status(200).json({ success: false, message: err.message });
      }
    })
  }
}

export default new UsuarioRouter().router;
