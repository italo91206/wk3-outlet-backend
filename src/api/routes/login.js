import { Router } from 'express';
import service from '../../app/login/loginService'
<<<<<<< HEAD

class LoginRouter {
    constructor() {
      this.router = Router();
      this.routes();
    }
  
    routes() {
=======
// import { middlewares } from '../middlewares';

class LoginRouter {
  /**
   * @constructor
   */
  constructor() {
    this.router = express.Router();
    // this.middlewares();
    this.routes();
  }

  middlewares() {
    this.router.use(middlewares);
  }

  routes() {
>>>>>>> development
    //   para fazer o login
    this.router.post('/login', async (req, res) => {
      let dados;
      try {
        dados = await service.handleLogin(req);
        res.status(200).json({ success: true, data: dados });
      }
      catch (err) {
        res.status(200).json({ success: false, message: err.message });
      }
    });
  }
}

export default new LoginRouter().router;