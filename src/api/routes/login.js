import { Router } from 'express';
import service from '../../app/login/loginService'

class LoginRouter {
    constructor() {
      this.router = Router();
      this.routes();
    }
  
    routes() {
    //   para fazer o login
      this.router.post('/login', async (req, res) => {
          let dados;
          try{
            dados = await service.handleLogin(req);
            res.status(200).json(dados);
          }
          catch(err){
            res.status(400).json({ success: false, error: err.message });
          }
        });
    }
}
  
export default new LoginRouter().router;