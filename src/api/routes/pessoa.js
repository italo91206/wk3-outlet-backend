import { Router } from 'express';
import service from '../../app/pessoa/pessoaService';
import serviceContato from '../../app/pessoa/pessoaContato/pessoaContatoService';
import { middlewares } from '../middlewares';

/** Router Pessoa */
class PessoaRouter {
  constructor() {
    this.router = Router();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.router.use(middlewares);
  }

  routes() {
    this.router.put('/updatePessoa/:id', async (req, res) => {
      let dados;
      try {
        dados = await service.handleAlteraPessoa(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.delete('/deletePessoa/:id', async (req, res) => {
      let dados;
      try {
        dados = await service.handleDeletePessoa(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.get('/getPessoa', async (req, res) => {
      let dados;
      try {
        dados = await service.handleBuscaPessoaRequest();
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.get('/getPessoa/:id', async (req, res) => {
      let dados;
      try {
        dados = await service.handleBuscaPessoaIdRequest(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.put('/updatePessoaContato/:id', async (req, res) => {
      let dados;
      try {
        dados = await serviceContato.handleAlteraContatoPessoa(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.delete('/deletePessoaContato/:id', async (req, res) => {
      let dados;
      try {
        dados = await serviceContato.handleDeleteContatoPessoa(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.get('/getPessoaContato', async (req, res) => {
      let dados;
      try {
        dados = await serviceContato.handleBuscaContatoPessoaRequest();
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.get('/getPessoaContato/:id', async (req, res) => {
      let dados;
      try {
        dados = await serviceContato.handleBuscaContatoPessoaIdRequest(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });
  }
}

export default new PessoaRouter().router;
