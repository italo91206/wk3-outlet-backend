import { Router } from 'express';
import { middlewares } from '../middlewares';
import service from '../../app/marca/marcaService';

class MarcaRouter {
  constructor() {
    this.router = Router();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.router.use(middlewares);
  }

  routes() {
    this.router.get('/marcas', async (req, res) => {
      let dados;
      try {
        dados = await service.handleVerMarcas();
        res.status(200).json({ success: true, data: dados });
      }
      catch (err) {
        res.status(200).json({ success: false, message: err.message })
      }
    });

    this.router.get('/marca', async(req, res) => {
      let dados;
      try{
        dados = await service.handleVerMarca(req);
        res.status(200).json({ success: true, data: dados });
      }
      catch(err){
        res.status(200).json({ success: false, message: err.message });
      }
    })

    this.router.delete('/deletar', async (req, res) => {
      let dados;
      try {
        dados = await service.handleDeleteMarca(req);
        res.status(200).json({ success: true, data: dados });
      }
      catch (err) {
        res.status(200).json({ success: false, message: err.message });
      }
    });

    this.router.put('/atualizar', async (req, res) => {
      let dados;
      try {
        dados = await service.handleEditarMarca(req);
        res.status(200).json({ success: true, data: dados });
      }
      catch (err) {
        res.status(200).json({ success: false, message: err.message });
      }
    });

    this.router.post('/novo', async (req, res) => {
      let dados;
      try {
        dados = await service.handleInsert(req);
        res.status(200).json({ success: true, data: dados });
      }
      catch (err) {
        res.status(200).json({ success: false, error: err.message });
      }
    })
  }
}

export default new MarcaRouter().router;