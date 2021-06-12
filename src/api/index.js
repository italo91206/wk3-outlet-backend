import express from 'express';

import authRouter from './routes/auth';
// import acessoLiberado from './routes/acessoLiberado';
// import usuarioRouter from './routes/usuario';
// import pessoaRouter from './routes/pessoa';
// import empresaRouter from './routes/empresa';
// import peritoRouter from './routes/perito';
// import localRouter from './routes/local';
// import cidadeRouter from './routes/cidade';
// import laudoRouter from './routes/laudo';
// import ativaConta from './routes/ativaConta';
// import ambienteRouter from './routes/ambiente';
// import patologiaRouter from './routes/patologia';
import loginRouter from './routes/login'

class RouteController {
  constructor() {
    this.router = express.Router();
    this.routes();
  }

  routes() {
    this.router.use('/login', loginRouter);
    this.router.use('/auth', authRouter);
    // this.router.use('/acessoLiberado', acessoLiberado);
    // this.router.use('/cadastro', ativaConta);
    // this.router.use('/usuario', usuarioRouter);
    // this.router.use('/pessoa', pessoaRouter);
    // this.router.use('/empresa', empresaRouter);
    // this.router.use('/perito', peritoRouter);
    // this.router.use('/local', localRouter);
    // this.router.use('/cidade', cidadeRouter);
    // this.router.use('/laudo', laudoRouter);
    // this.router.use('/ambiente', ambienteRouter);
    // this.router.use('/patologia', patologiaRouter);
  }
}

export default new RouteController().router;
