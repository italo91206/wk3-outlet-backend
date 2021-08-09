import express from 'express';

import authRouter from './routes/auth';
// import acessoLiberado from './routes/acessoLiberado';
import usuarioRouter from './routes/usuario';
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
import modeloRouter from './routes/modelo'
import marcaRouter from './routes/marcas'
import produtoRouter from './routes/produto'
import coresRouter from './routes/cores'
import motivosRouter from './routes/motivos'
import tamanhoRouter from './routes/tamanhos'
import cupomRouter from './routes/cupons'

class RouteController {
  constructor() {
    this.router = express.Router();
    this.routes();
  }

  routes() {
    this.router.use('/login', loginRouter);
    this.router.use('/auth', authRouter);
    this.router.use('/modelo', modeloRouter);
    this.router.use('/marca', marcaRouter);
    this.router.use('/produto', produtoRouter);
    this.router.use('/cor', coresRouter);
    // this.router.use('/acessoLiberado', acessoLiberado);
    // this.router.use('/cadastro', ativaConta);
    this.router.use('/usuario', usuarioRouter);
    this.router.use('/motivo', motivosRouter);
    this.router.use('/tamanho', tamanhoRouter);
    this.router.use('/cupom', cupomRouter);
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
