import { DataNotFoundException } from '../../utils/exceptions';
import slugify from 'slugify';
import multer from 'multer';

const connection = require('../../database/connection');
const fs = require("fs");

const upload = multer({
	dest: "/public/images"
})


export default {
	async listarProdutos() {
		const produtos = await connection('produtos')
			.where('is_enabled', true)
			.select('*');

		return produtos;
	},

	async getProduto(req) {
		const { url } = req.query;
		const produto = await connection('produtos')
			.select('*')
			.where('url', url)
			.first();

		if (!produto)
			throw { message: 'Este produto não existe.' };
		else
			return produto;
	},

	async novoProduto(req) {
		let { produto } = req.body;
		let imagens = produto.imagens;
		delete produto.imagens;
		
		if(produto.custo) produto.custo = parseFloat(produto.custo); else produto.custo = 0;
		if(produto.peso) produto.peso = parseFloat(produto.peso); else produto.peso = 0;
		if(produto.preco) produto.preco = parseFloat(produto.preco);
		if(produto.estoque) produto.estoque = parseInt(produto.estoque); else produto.estoque = 0;
		produto.url = slugify(produto.nome, { remove: /[*+~.()'"!:@]/g, lower: true });

		// force is_enabled
		produto.is_enabled = true;

		const novo = await connection('produtos')
			.insert(produto, 'produto_id');

		upload.single("file" /* name attribute of <file> element in your form */)
		const tempPath = req.file.path;
    	const targetPath = path.join(__dirname, "./uploads/image.png");
		if (path.extname(req.file.originalname).toLowerCase() === ".png") {
			fs.rename(tempPath, targetPath, err => { if (err) throw { message: err };});
		} 
		else {
			fs.unlink(tempPath, err => { if (err) throw { message: err };});
		}
		
		console.log(imagens);

		return novo;
	},

	async deletarProduto(req) {
		const { id } = req.body;

		const atualizar = await connection('produtos')
			.where('produto_id', id)
			.update({ is_enabled: false });

		return atualizar;
	},

	async atualizarProduto(req) {
		const { produto } = req.body;
		const atualizar = await connection('produtos').where('produto_id', produto.produto_id).update(produto, 'produto_id');

		return atualizar;
	}
}