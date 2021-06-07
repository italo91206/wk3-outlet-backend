import { Router } from 'express';
import { middlewares } from '../middlewares';
import service from '../../app/patologia/patologiaService';

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
    this.router.post('/insertClassificacaoPatologia', async (req, res) => {
      let dados;
      try {
        dados = await service.handleInsertClassificacaoPatologia(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.put('/updateClassificacaoPatologia/:id', async (req, res) => {
      let dados;
      try {
        dados = await service.handleUpdateClassificacaoPatologia(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.get('/getClassificacaoPatologias', async (req, res) => {
      let dados;
      try {
        dados = await service.handleGetClassificacaoPatologias();
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.get('/getClassificacaoPatologia/:id', async (req, res) => {
      let dados;
      try {
        dados = await service.handleGetClassificacaoPatologiaId(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.delete(
      '/deleteClassificacaoPatologia/:id',
      async (req, res) => {
        let dados;
        try {
          dados = await service.handleDeleteClassificacaoPatologia(req);
          res.status(200).json(dados);
        } catch (err) {
          res.status(400).json({ success: false, error: err.message });
        }
      }
    );

    this.router.delete(
      '/ativaOuDeleteLogicoClassificacaoPatologia/:id/:ativo',
      async (req, res) => {
        let dados;
        try {
          dados = await service.handleAtivaOuDeleteLogicoClassificacaoPatologia(
            req
          );
          res.status(200).json(dados);
        } catch (err) {
          res.status(400).json({ success: false, error: err.message });
        }
      }
    );
  }
}

export default new AmbienteRouter().router;
