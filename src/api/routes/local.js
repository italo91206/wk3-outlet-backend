import { Router } from 'express';
import service from '../../app/local/localService';
import { middlewares } from '../middlewares';

class LocalRouter {
  constructor() {
    this.router = Router();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.router.use(middlewares);
  }

  routes() {
    this.router.post('/insertLocal', async (req, res) => {
      let dados;
      try {
        dados = await service.handleCadastraLocal(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.put('/updateLocal/:id', async (req, res) => {
      let dados;
      try {
        dados = await service.handleAlteralocal(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.delete('/deleteLocal/:id', async (req, res) => {
      let dados;
      try {
        dados = await service.handleDeleteFisicoLocal(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.delete(
      '/ativaOuDeleteLogicoLocal/:id/:ativo',
      async (req, res) => {
        let dados;
        try {
          dados = await service.handleAtivaOuDeleteLogicoLocal(req);
          res.status(200).json(dados);
        } catch (err) {
          res.status(400).json({ success: false, error: err.message });
        }
      }
    );

    this.router.get('/getLocal', async (req, res) => {
      let dados;
      try {
        dados = await service.handleBuscaLocalRequest();
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.get('/getLocal/:id', async (req, res) => {
      let dados;
      try {
        dados = await service.handleBuscaLocalIdRequest(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });
  }
}

export default new LocalRouter().router;
