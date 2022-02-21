/** @module Api/routes/auth */
import express from 'express';
import auth from '../../auth/authService';
import { middlewares } from '../middlewares';
import { middlewaresRecupera } from '../middlewares';
// import serviceRecupera from '../../app/cadastro/cadastroService';
import logger from '../../utils/logger';
class AuthRoute {
  /**
   * @constructor
   */
  constructor() {
    this.router = express.Router();
    this.routes();
  }

  routes() {
    /** Realiza login */
    this.router.post('/login', async (req, res) => {
      const { email, password } = req.body;
      let user;
      try {
        user = await auth.AuthenticateAndReturnToken(email, password);
        return res.status(200).json({ success: true, data: user });
      }
      catch (err) {
        return res.status(200).json({ success: false, error: err.message });
      }
    });
    /** Recupera senha - Envia um e-mail com o token para realizar a troca de senha */
    // this.router.post('/recuperaSenha', async (req, res) => {
    //   const { emailRecover } = req.body;
    //   let user;
    //   try {
    //     user = await auth.RecuperaSenhaReturnToken(emailRecover);
    //     res.status(200).json(user);
    //   } catch (err) {
    //     res.status(400).json({ success: false, error: err.message });
    //   }
    // });
    /** Cadastra a senha nova */
    // this.router.put('/recuperaSenha', middlewaresRecupera, async (req, res) => {
    //   let dados;
    //   try {
    //     dados = await serviceRecupera.handleRecuperaSenhaRequest(req);
    //     res.status(200).json(dados);
    //   } catch (err) {
    //     res.status(400).json({ success: false, error: err.message });
    //   }
    // });
    /** Teste de rota autenticada */
    // this.router.get('/protegida', ...middlewares, async (req, res) => {
    //   try {
    //     res.status(200).json('Conseguiu');
    //   } catch (err) {
    //     res.status(401).json('Nada feito');
    //   }
    // });
  }
}

export default new AuthRoute().router;
