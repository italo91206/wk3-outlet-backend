const connection = require('../../database/connection');

export default {
  async gravarEnderecos(nomes, id){
		nomes.forEach(async (item) => {
			let imagem = {}
			imagem.url = `/static/${item}`;
			imagem.produto_id = id;

			const novo = await connection('imagens')
				.insert(imagem, 'imagem_id')
		})

		return true;
	},

	async recuperarEnderecos(id){
		const enderecos = await connection('imagens')
			.where('produto_id', id)
			.select('url');

		return enderecos;
	}
}