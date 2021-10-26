import { DataNotFoundException } from '../../utils/exceptions';
import slugify from 'slugify';
import { hasUncaughtExceptionCaptureCallback } from 'process';

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
      
    const filhos = await this.getFilhos(produto.produto_id)
    if(filhos)
      produto.variacoes = filhos;

    const imagens = await connection('imagens')
      .where('produto_id', produto.produto_id)
      .select('*');
    
    if(imagens)
      produto.imagens = imagens;

		if (!produto)
			throw { message: 'Este produto não existe.' };
		else
			return produto;
	},

	async novoProduto(req) {
		let { produto } = req.body;
		let variacoes = null;
    if(produto.variacoes) variacoes = produto.variacoes;

		const nome_existente = await connection('produtos')
			.where('nome', produto.nome)
			.select('*');

		delete produto.variacoes;

		if (produto.custo) produto.custo = parseFloat(produto.custo); else produto.custo = 0;
		if (produto.peso) produto.peso = parseFloat(produto.peso); else produto.peso = 0;
		if (produto.preco) produto.preco = parseFloat(produto.preco);
		if (produto.preco && produto.custo) produto.lucro = produto.preco - produto.custo;
		if (produto.estoque) produto.estoque = parseInt(produto.estoque); else produto.estoque = 0;
		produto.url = slugify(produto.nome, { remove: /[*+~.()'"!:@]/g, lower: true });
		if(!produto.sku)
		produto.sku = produto.url;

		if (nome_existente.length > 0) {
			let prox = nome_existente.length + 1;
			produto.url = `${produto.url}-${prox}`;
		}

		// force is_enabled
		produto.is_enabled = true;

		const novo_produto = await connection('produtos')
			.insert(produto, 'produto_id');

		if(variacoes) {
			variacoes.forEach(async (variacao) => {
        const novo = { 
          produto_id: parseInt(novo_produto),
          tamanho_id: null,
          tamanho_nome: null,
          cor_id: null,
          cor_nome: null,
          cor_hexa: null,
          quantidade: variacao.quantidade,
        }
				if(variacao.cor_id){
          novo.cor_id = variacao.cor_id;
          novo.cor_nome = variacao.cor;
        };
        if(variacao.tamanho_id){
          novo.tamanho_id = variacao.tamanho_id;
          novo.tamanho_nome = variacao.tamanho;
        }
        
        console.log(novo);

        let nova_variacao = await connection('variacoes')
          .insert(novo, 'variacao_id');
			})
		}

		return novo_produto;
	},

	async deletarProduto(req) {
		const { id } = req.body;

    const em_uso = await connection('acerto_estoque')
      .where('produto_id', id);
    
    if(em_uso.length){
      const atualizar = await connection('produtos')
        .where('produto_id', id)
        .update({ is_enabled: false });
    }
    else{
      const variacoes = await connection('variacoes')
        .where('produto_id', id);

      if(variacoes.length){
        const deletar_variacoes = await connection('variacoes')
          .where('produto_id', id)
          .del();
      }

      const imagens = await connection('imagens')
			.where('produto_id', id)
			.select('*');
		
      // só pode realmente apagar as imagens se for exclusão física
      // mas por enquanto já vamos simular logo de cara.
      if(imagens){
        var fs = require('fs');
        
        imagens.forEach(async (item) => {
          // console.log(item.url)
          var link = item.url;
          link = link.split('/static/')
          
          fs.unlink(`./src/public/${link[1]}`, function(err){
            if(err) throw err;
          });

          // console.log(`Deletando: ${item.imagem_id}`);
          const deletar = await connection('imagens')
            .where('imagem_id', item.imagem_id)
            .del();
        })
      }

      const deletar = await connection('produtos')
        .where('produto_id', id)
        .del();
    }
    
		return true;
	},

	async atualizarProduto(req) {
    const { produto } = req.body;
    let variacoes = null;
    if(produto.variacoes) variacoes = produto.variacoes;
    delete produto.variacoes;
    delete produto.imagens;

		const existe_sku = await connection('produtos')
			.where('sku', produto.sku)
			.whereNot('produto_id', produto.produto_id);
		
		if(existe_sku.length)
			throw { message: 'Já existe um produto com este SKU' };
		else{
			const atualizar = await connection('produtos')
				.where('produto_id', produto.produto_id)
				.update(produto, 'produto_id');

      if(variacoes){
        variacoes.forEach(async (variacao) => {
          const novo = {
            produto_id: produto.produto_id,
            tamanho_id: null,
            cor_id: null,
            quantidade: variacao.quantidade,
          }
          if(variacao.cor_id){
            novo.cor_id = variacao.cor_id;
            novo.cor_nome = variacao.cor;
          };
          if(variacao.tamanho_id){
            novo.tamanho_id = variacao.tamanho_id;
            novo.tamanho_nome = variacao.tamanho;
          }
          if(variacao.variacao_id){
            let nova_variacao = await connection('variacoes')
              .where('variacao_id', variacao.variacao_id)
              .update(novo, 'variacao_id');
          }
          else{
            // console.log('vou adicionar uma nova variação')
            // console.log(novo);
            let nova_variacao = await connection('variacoes')
              .insert(novo, 'variacao_id');
          }
        })
      }

			return atualizar;
		}	
	},

	async getUrlById(id){
		const url = await connection('produtos')
			.where('produto_id', id)
			.select('url')
			.first();

		return url;
	},

	async getFilhos(id){
		const filhos = await connection('variacoes')
      .where('produto_id', id);
     
		return filhos;
  },
  
  async removerVariacao(req){
    const { id } = req.query;
    
    const response = await connection('variacoes')
      .where('variacao_id', id)
      .del();

    return response;
  }
}