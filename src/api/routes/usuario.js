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
        res.status(200).json(dados);
      }
      catch(err){
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.post('/usuario', async (req, res) => {
      let dados;
      try{
        dados = await service.handleListarUsuario(req);
        res.status(200).json(dados);
      }
      catch(err){
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.post('/novo', async (req, res) => {
      let dados;
      try{
        dados = await service.handleNovoUsuario(req);
        res.status(200).json(dados);
      }
      catch(err){
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.post('/deletar', async (req, res) => {
      let dados;
      try{
        dados = await service.handleDeletarUsuario(req);
        res.status(200).json(dados);
      }
      catch(err){
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.put('/editar', async(req, res) => {
      let dados;
      try{
        dados = await service.handleAtualizarUsuario(req);
        res.status(200).json(dados);
      }
      catch(err){
        res.status(400).json({ success: false, error: err.message });
      }
    })

    // this.router.put('/putUsuario/:id', async (req, res) => {
    //   let dados;
    //   try {
    //     dados = await service.handleAlteraRequest(req);
    //     res.status(200).json(dados);
    //   } catch (err) {
    //     res.status(400).json({ success: false, error: err.message });
    //   }
    // });

    // this.router.delete('/deleteUsuario/:id', async (req, res) => {
    //   let dados;
    //   try {
    //     dados = await service.handleDeleteRequest(req);
    //     res.status(200).json(dados);
    //   } catch (err) {
    //     res.status(400).json({ success: false, error: err.message });
    //   }
    // });

    // this.router.get('/getUsuario', async (req, res) => {
    //   let dados;
    //   try {
    //     dados = await service.handleBuscaUsuarioRequest();
    //     res.status(200).json(dados);
    //   } catch (err) {
    //     res.status(400).json({ success: false, error: err.message });
    //   }
    // });

    // this.router.get('/getUsuario/:id', async (req, res) => {
    //   let dados;
    //   try {
    //     dados = await service.handleBuscaUsuarioIdRequest(req);
    //     res.status(200).json(dados);
    //   } catch (err) {
    //     res.status(400).json({ success: false, error: err.message });
    //   }
    // });

    // this.router.get('/getCountLaudos', async (req, res) => {
    //   let dados;
    //   try {
    //     dados = await service.handleCountLaudosRequest(req);
    //     res.status(200).json(dados);
    //   } catch (err) {
    //     res.status(400).json({ success: false, error: err.message });
    //   }
    // });
  }
}

export default new UsuarioRouter().router;
