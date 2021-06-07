import { Router } from 'express';
import service from '../../app/perito/peritoService';
import { middlewares } from '../middlewares';

/** Router Pessoa */
class PeritoRouter {
  constructor() {
    this.router = Router();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.router.use(middlewares);
  }

  routes() {
    this.router.post('/insertPerito', async (req, res) => {
      let dados;
      try {
        dados = await service.handleCadastraPerito(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.put('/updatePerito/:id', async (req, res) => {
      let dados;
      try {
        dados = await service.handleAlteraPerito(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.delete('/deletePerito/:id', async (req, res) => {
      let dados;
      try {
        dados = await service.handleDeleteFisicoPerito(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.delete(
      '/ativaOuDeleteLogicoPerito/:id/:ativo',
      async (req, res) => {
        let dados;
        try {
          dados = await service.handleAtivaOuDeleteLogicoPerito(req);
          res.status(200).json(dados);
        } catch (err) {
          res.status(400).json({ success: false, error: err.message });
        }
      }
    );

    this.router.get('/getPerito', async (req, res) => {
      let dados;
      try {
        dados = await service.handleBuscaPeritoRequest();
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.get('/getPerito/:id', async (req, res) => {
      let dados;
      try {
        dados = await service.handleBuscaPeritoIdRequest(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });
  }
}

export default new PeritoRouter().router;
