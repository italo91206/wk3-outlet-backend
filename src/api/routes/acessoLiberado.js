import { Router } from 'express';
import serviceCadastro from '../../app/cadastro/cadastroService';

/** Cadastros liberados, sem a necessida de Token (Cadastro usuario e pessoa) */
class acessoLiberadoRouter {
  constructor() {
    this.router = Router();
    this.routes();
  }
  routes() {
    this.router.post('/cadastro', async (req, res) => {
      let dados;
      try {
        dados = await serviceCadastro.handleCadastroRequest(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.get('/getPrefix', async (req, res) => {
      let dados;
      try {
        dados = await serviceCadastro.handleBuscaPrefixRequest();
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });

    this.router.get('/getPrefix/:id', async (req, res) => {
      let dados;
      try {
        dados = await serviceCadastro.handleBuscaPrefixIdRequest(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });
  }
}

export default new acessoLiberadoRouter().router;
