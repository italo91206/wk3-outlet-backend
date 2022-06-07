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

      // this.app.use((err, req, res, next) => {
      //   if (res.headersSent) {
      //     return next(err);
      //   }
      //   res.status(500).json({ error: err });
      // })
    }

    /**
     * API
     */
    routes() {
      this.app.use('', api);
      this.app.use('/static', express.static('./src/public'));
      this.app.use(httpHandlers);
    }
  }

export default new App().app;
