import { DataNotFoundException } from '../../utils/exceptions';
import slugify from 'slugify';

const connection = require('../../database/connection');

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

		if(!produto)
      throw { message: 'Este produto não existe.' };
    else
			return produto;
	},

	async novoProduto(req) {
		let { produto } = req.body;
		produto.custo = parseFloat(produto.custo);
		produto.peso = parseFloat(produto.peso);
		produto.preco = parseFloat(produto.preco);
		produto.estoque = parseInt(produto.estoque, 10);
		produto.url = slugify(produto.nome, { remove: /[*+~.()'"!:@]/g, lower: true });

		// force is_enabled
		produto.is_enabled = true;

		const novo = await connection('produtos')
			.insert(produto, 'produto_id');
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