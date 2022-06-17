import { Router } from 'express';
import { middlewares } from '../middlewares';
import service from '../../app/imagem/imagemService.js'
import sharp from 'sharp';

const multer = require("multer");
var path = require('path');

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
        let src_path = path.join(__dirname, '../../public/');
        let files_name = [];

        req.files.forEach((file) => {
          let caminho_arquivo = src_path + file.originalname
          let caminho_final = `${file.filename}`
          caminho_final = caminho_final
            .replace('.jpeg', '.webp')
            .replace('.jpg', '.webp')
            .replace('.gif', '.webp')
            .replace('.png', '.webp')
          files_name.push({caminho_final, caminho_arquivo})
        })

        files_name.forEach(async (file) => {
          await sharp(file.caminho_arquivo)
            .webp({ quality: 20 })
            .toFile(src_path + file.caminho_final)
            .finally(async () => {
              try {
                const dados = await service.handleSalvarImagens(files_name, id);
                res.status(200).json({ success: true, data: dados });
              }
              catch (err) {
                res.status(200).json({ success: false, message: err.message });
              }
            })
        })
      }
      else
        res.status(200).json({ success: false, message: "No files informed."})
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
