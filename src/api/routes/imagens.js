import { Router } from 'express';
import { middlewares } from '../middlewares';

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
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

	middlewares(){
		this.router.use(middlewares);
	}

	routes(){
		this.router.post('/upload', upload.array('fileimage'), (req, res) => {
			console.log(req.body);
			console.log(req.files);
			if(!req.files)
				res.status(200).json({ success: false, message: 'Algo aconteceu com o upload de imagens.'});
			else
				res.status(200).json({ success: true });
		})
	}
}

export default new ImagensRouter().router;