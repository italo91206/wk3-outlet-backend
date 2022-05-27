import { Router } from 'express';
import { middlewares } from '../middlewares';
import service from '../../app/imagem/imagemService.js'

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './src/public');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

class ImagensRouter {
  constructor() {
    this.router = Router();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.router.use(middlewares);
  }

  routes() {
    this.router.post('/upload', upload.array('fileimage', 10), async (req, res) => {
      if(req.files.length){
        let id = req.body.id;
        try {
          // req.files.forEach((item) => { nomes.push(item.filename); })
          // console.log(req.files);
          // const dados = await service.handleGravarEnderecos(nomes, id);
          const dados = await service.handleSalvarImagens(req.files, id);
          if (!req.files)
            res.status(200).json({ success: false, message: 'Algo aconteceu com o upload de imagens.' });
          else
            res.status(200).json({ success: true, data: dados });
        }
        catch (err) {
          res.status(200).json({ success: false, message: err.message });
        }
      }
    });

    this.router.get('/recuperar', async (req, res) => {
      let dados;
      let { id } = req.query;
      try {
        dados = await service.handleRecuperarEnderecos(id);
        res.status(200).json({ success: true, data: dados });
      }
      catch (err) {
        res.status(200).json({ success: false, message: err.message });
      }
    });

    this.router.delete('/remover', async(req, res) => {
      let dados;
      let { id } = req.query;

      try{
        dados = await service.handleRemoverImagem(id);
        res.status(200).json({ success: true, data: dados });
      }
      catch(err){
        res.status(200).json({ success: false, message: err.message });
      }
    })
  }
}

export default new ImagensRouter().router;
