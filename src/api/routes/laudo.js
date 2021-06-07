import { Router } from 'express';
import service from '../../app/laudo/laudoService';
import serviceLaudoAmbiente from '../../app/laudo/laudoAmbiente/laudoAmbienteService';
import { middlewares } from '../middlewares';
import multerConfig from '../middlewares/multer';
import multer from 'multer';

class LaudoRouter {
  constructor() {
    this.router = Router();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.router.use(middlewares);
  }

  routes() {
    this.router.post('/insertLaudo', async (req, res) => {
      let dados;
      try {
        dados = await service.handleCadastraLaudo(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.put('/updateLaudo/:id', async (req, res) => {
      let dados;
      try {
        dados = await service.handleAlteraLaudo(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.delete('/deleteLaudo/:id', async (req, res) => {
      let dados;
      try {
        dados = await service.handleDeleteFisicoLaudo(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.get('/getLaudo', async (req, res) => {
      let dados;
      try {
        dados = await service.handleBuscaLaudoRequest();
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.get('/getLaudos', async (req, res) => {
      let dados;
      try {
        dados = await service.handleBuscaLaudosGeralRequest();
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.get('/getLaudo/:id', async (req, res) => {
      let dados;
      try {
        dados = await service.handleBuscaLaudoIdRequest(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.get('/getTipoLaudo', async (req, res) => {
      let dados;
      try {
        dados = await service.handleBuscaTipoLaudoRequest();
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.get('/getTipoLaudo/:id', async (req, res) => {
      let dados;
      try {
        dados = await service.handleBuscaTipoLaudoIdRequest(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.get('/getTipoEdificio', async (req, res) => {
      let dados;
      try {
        dados = await service.handleBuscaTipoEdificioRequest();
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.get('/getTipoEdificio/:id', async (req, res) => {
      let dados;
      try {
        dados = await service.handleBuscaTipoEdificioIdRequest(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.get('/getTipoRequerente', async (req, res) => {
      let dados;
      try {
        dados = await service.handleBuscaTipoRequerenteRequest();
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.get('/getTipoRequerente/:id', async (req, res) => {
      let dados;
      try {
        dados = await service.handleBuscaTipoRequerenteIdRequest(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.get('/getTiposEstruturas', async (req, res) => {
      let dados;
      try {
        dados = await service.handleBuscaTiposEstruturasRequest();
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.get('/getTiposEstruturas/:id', async (req, res) => {
      let dados;
      try {
        dados = await service.handleBuscaTiposEstruturasIdRequest(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.get('/getStatusLaudo', async (req, res) => {
      let dados;
      try {
        dados = await service.handleBuscaStatusLaudoRequest();
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.get('/getStatusLaudo/:id', async (req, res) => {
      let dados;
      try {
        dados = await service.handleBuscaStatusLaudoIdRequest(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.post(
      '/insertLaudoAmbiente',
      multer(multerConfig).array('image', 12),
      async (req, res, next) => {
        let dados;

        try {
          dados = await serviceLaudoAmbiente.handleInsertLaudoAmbienteRequest(
            req,
            next
          );
          res.status(200).json(dados);
        } catch (err) {
          res.status(400).json({ success: false, error: err.message });
        }
      }
    );
  }
}

export default new LaudoRouter().router;
