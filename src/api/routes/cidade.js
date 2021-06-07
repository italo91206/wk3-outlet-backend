import { Router } from 'express';
import serviceCidade from '../../app/cidade/cidadeService';
import serviceBairro from '../../app/cidade/bairro/bairroService';
import { middlewares } from '../middlewares';

class CidadeRouter {
  constructor() {
    this.router = Router();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.router.use(middlewares);
  }

  routes() {
    /** Municipio */
    this.router.post('/insertMunicipio', async (req, res) => {
      let dados;
      try {
        dados = await serviceCidade.handleInsertMunicipio(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.put('/updateMunicipio/:id', async (req, res) => {
      let dados;
      try {
        dados = await serviceCidade.handleAlteraMunicipio(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.delete('/deleteMunicipio/:id', async (req, res) => {
      let dados;
      try {
        dados = await serviceCidade.handleDeleteFisicoMunicipio(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.get('/getMunicipio', async (req, res) => {
      let dados;
      try {
        dados = await serviceCidade.handleBuscaMunicipioRequest();
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.get('/getMunicipio/:id', async (req, res) => {
      let dados;
      try {
        dados = await serviceCidade.handleBuscaMunicipioIdRequest(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    /** Bairro */

    this.router.post('/insertBairro', async (req, res) => {
      let dados;
      try {
        dados = await serviceBairro.handleInsertBairro(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.put('/updateBairro/:id', async (req, res) => {
      let dados;
      try {
        dados = await serviceBairro.handleAlteraBairro(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.delete('/deleteBairro/:id', async (req, res) => {
      let dados;
      try {
        dados = await serviceBairro.handleDeleteFisicoBairro(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.get('/getBairro', async (req, res) => {
      let dados;
      try {
        dados = await serviceBairro.handleBuscaBairroRequest();
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.get('/getBairro/:id', async (req, res) => {
      let dados;
      try {
        dados = await serviceBairro.handleBuscaBairroIdRequest(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });
  }
}

export default new CidadeRouter().router;
