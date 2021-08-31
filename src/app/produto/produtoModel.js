import { DataNotFoundException } from '../../utils/exceptions';
import slugify from 'slugify';

const connection = require('../../database/connection');
const fq = require('fs');
const path = require('path');
const multer = require('multer');

// const upload = multer({
// 	dest: '/teste'
// })


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
    let variacoes = produto.variacoes.length >= 1 ? produto.variacoes : null;  

		const nome_existente = await connection('produtos')
			.where('nome', produto.nome)
			.select('*');
    
    delete produto.variacoes;  
      
		if(produto.custo) produto.custo = parseFloat(produto.custo); else produto.custo = 0;
		if(produto.peso) produto.peso = parseFloat(produto.peso); else produto.peso = 0;
		if(produto.preco) produto.preco = parseFloat(produto.preco);
		if(produto.estoque) produto.estoque = parseInt(produto.estoque); else produto.estoque = 0;
		produto.url = slugify(produto.nome, { remove: /[*+~.()'"!:@]/g, lower: true });
		
		if(nome_existente.length > 0){
			let prox = nome_existente.length + 1;
			produto.url = `${produto.url}-${prox}`;
		}

    

		// force is_enabled
		produto.is_enabled = true;

		const novo = await connection('produtos')
			.insert(produto, 'produto_id');

    if(variacoes){
      variacoes.forEach(async (variacao) => {
        let novo_produto = { ...produto };
        if(variacao.cor_id)
          novo_produto.cor_id = variacao.cor_id;
        if(variacao.tamanho_id)
          novo_produto.tamanho_id = variacao.tamanho_id;
        novo_produto.nome = variacao.nome;
        novo_produto.produto_pai = parseInt(novo);
        novo_produto.url = slugify(novo_produto.nome, { remove: /[*+~.()'"!:@]/g, lower: true });

        console.log(novo_produto.produto_pai);
        let nova_variacao = await connection('produtos').insert(novo_produto, 'produto_id');
      })
    }

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