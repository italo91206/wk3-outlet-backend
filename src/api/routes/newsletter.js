import { Router } from 'express';
import service from '../../app/newsletter/newsletterService';

class NewsletterRouter {
  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.post('/cadastrar', async (req, res) => {
      let dados;
      try {
        dados = await service.handleCadastrar(req);
        res.status(200).json({ success: true, data: dados });
      }
      catch (err) {
        res.status(200).json({ success: false, message: err.message });
      }
    });

    this.router.get('/usuario/:perfil_id', async(req, res) => {
      let dados;

      try {
        dados = await service.handleGetByUser(req);
        res.status(200).json({ success: true, data: dados })
      }
      catch(err){
        res.status(200).json({ success: false, message: err.message })
      }
    })

    this.router.delete('/cadastro/:newsletter_id', async(req, res) => {
      let dados;

      try {
        dados = await service.handleDelete(req);
        res.status(200).json({ success: true, data: dados })
      }
      catch(err){
        res.status(200).json({ success: false, message: err.message })
      }
    })
  }
}

export default new NewsletterRouter().router;
