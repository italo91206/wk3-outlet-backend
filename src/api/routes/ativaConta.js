import { Router } from 'express';
import { middlewaresAtivaConta } from '../middlewares';
import cadastroService from '../../app/cadastro/cadastroService';

/** Router Ativa Cadastro */
class AtivaContaRoute {
  constructor() {
    this.router = Router();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.router.use(middlewaresAtivaConta);
  }

  routes() {
    /** Ativa o cadastro */
    this.router.post('/ativaCadastro', async (req, res) => {
      let dados;
      try {
        dados = await cadastroService.AtivaCadastroRequest(req);
        res.status(200).json(dados);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    });
  }
}

export default new AtivaContaRoute().router;
