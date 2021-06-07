import { Router } from 'express';
import service from '../../app/empresa/empresaService';
import { middlewares } from '../middlewares';

class EmpresaRouter {
  constructor() {
    this.router = Router();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.router.use(middlewares);
  }

  routes() {
    this.router.post('/insertEmpresa', async (req, res) => {
      let dados;
      try {
        dados = await service.handleCadastraEmpresa(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.put('/updateEmpresa/:id', async (req, res) => {
      let dados;
      try {
        dados = await service.handleAlteraEmpresa(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.delete('/deleteFisicoEmpresa/:id', async (req, res) => {
      let dados;
      try {
        dados = await service.handleDeleteFisicoEmpresa(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.delete(
      '/ativaOuDeleteLogicoEmpresa/:id/:ativo',
      async (req, res) => {
        let dados;
        try {
          dados = await service.handleAtivaOuDeleteLogicoEmpresa(req);
          res.status(200).json(dados);
        } catch (err) {
          res.status(400).json({ success: false, error: err.message });
        }
      }
    );

    this.router.get('/getEmpresa', async (req, res) => {
      let dados;
      try {
        dados = await service.handleBuscaEmpresaRequest();
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.get('/getEmpresa/:id', async (req, res) => {
      let dados;
      try {
        dados = await service.handleBuscaEmpresaIdRequest(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });
  }
}

export default new EmpresaRouter().router;
