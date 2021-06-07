import { Router } from 'express';
import { middlewares } from '../middlewares';
import service from '../../app/ambiente/ambienteService';

class AmbienteRouter {
  constructor() {
    this.router = Router();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.router.use(middlewares);
  }

  routes() {
    this.router.post('/insertAmbiente', async (req, res) => {
      let dados;
      try {
        dados = await service.handleInsertAmbiente(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.put('/updateAmbiente/:id', async (req, res) => {
      let dados;
      try {
        dados = await service.handleUpdateAmbiente(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.get('/getAmbientes', async (req, res) => {
      let dados;
      try {
        dados = await service.handleGetAmbientes();
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.get('/getAmbiente/:id', async (req, res) => {
      let dados;
      try {
        dados = await service.handleGetAmbienteId(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.delete('/deleteAmbiente/:id', async (req, res) => {
      let dados;
      try {
        dados = await service.handleDeleteAmbiente(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.delete(
      '/ativaOuDeleteLogicoAmbiente/:id/:ativo',
      async (req, res) => {
        let dados;
        try {
          dados = await service.handleAtivaOuDeleteLogicoAmbiente(req);
          res.status(200).json(dados);
        } catch (err) {
          res.status(400).json({ success: false, error: err.message });
        }
      }
    );

    this.router.post('/insertUsuarioAmbiente/', async (req, res) => {
      let dados;
      try {
        dados = await service.handleInsertUsuarioAmbiente(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.get('/getUsuariosAmbientes', async (req, res) => {
      let dados;
      try {
        dados = await service.handleGetUsuariosAmbientes();
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.get('/getUsuarioAmbiente/:id', async (req, res) => {
      let dados;
      try {
        dados = await service.handleGetUsuarioAmbienteId(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });
  }
}

export default new AmbienteRouter().router;
