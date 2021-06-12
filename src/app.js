import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import httpHandlers from './utils/httpHandlers';
import api from './api';

import './database/connection';

class App {
    constructor() {
      this.app = express();
      this.middlewares();
      this.routes();
    }
    /**
     * Carrega os middlewares da aplicação
     */
    middlewares() {
      this.app.use(helmet());
      this.app.use(cors());
      this.app.use(express.urlencoded({ extended: true }));
      this.app.use(bodyParser.json());
    }
  
    /**
     * API
     */
    routes() {
      this.app.use('', api);
      this.app.use(httpHandlers);
    }
  }

export default new App().app;