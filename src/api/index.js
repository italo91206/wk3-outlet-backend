import express from 'express';

import authRouter from './routes/auth';
import usuarioRouter from './routes/usuario';
import loginRouter from './routes/login'
import modeloRouter from './routes/modelo'
import marcaRouter from './routes/marcas'
import produtoRouter from './routes/produto'
import coresRouter from './routes/cores'
import motivosRouter from './routes/motivos'
import tamanhoRouter from './routes/tamanhos'
import cupomRouter from './routes/cupons'
import acertoEstoqueRouter from './routes/acerto-estoque'
import categoriasRouter from './routes/categorias'

class RouteController {
  constructor() {
    this.router = express.Router();
    this.routes();
  }

  routes() {
    this.router.use('/login', loginRouter);
    this.router.use('/auth', authRouter);
    this.router.use('/modelos', modeloRouter);
    this.router.use('/marcas', marcaRouter);
    this.router.use('/produto', produtoRouter);
    this.router.use('/cor', coresRouter);
    this.router.use('/usuario', usuarioRouter);
    this.router.use('/motivo', motivosRouter);
    this.router.use('/tamanho', tamanhoRouter);
    this.router.use('/cupom', cupomRouter);
    this.router.use('/acerto-de-estoque', acertoEstoqueRouter);
    this.router.use('/categorias', categoriasRouter);
  }
}

export default new RouteController().router;
