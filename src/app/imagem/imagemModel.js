import slugify from 'slugify';

const connection = require('../../database/connection');
const fs = require('fs');
var path = require('path');

export default {
  async gravarEnderecos(nomes, id) {
    nomes.forEach(async (item) => {
      let imagem = {}
      imagem.url = `/static/${item}`;
      imagem.produto_id = id;

      const novo = await connection('imagens')
        .insert(imagem, 'imagem_id')
    })

    return true;
  },

  async recuperarEnderecos(id) {
    const enderecos = await connection('imagens')
      .where('produto_id', id)
      .select('url');

    return enderecos;
  },

  async getImagesIndex(id){
    const images = await connection('imagens')
      .where('produto_id', id);

    return images.length || 1;
  },

  async salvarImagens(files, id) {
    const produto = await connection('produtos')
      .where('produto_id', id)
      .select('nome_produto')
      .first();
    const caminhos = [];

    const nome = slugify(produto.nome_produto, { remove: /[*+~.()'"!:@]/g, lower: true });
    let indice = await this.getImagesIndex(id);
    var caminho = path.join(__dirname, '../../public');

    files.forEach(async  (file) => {
      const original = file.originalname;
      const extensao = original.split('.')[1];
      const antes = `${caminho}/${original}`;
      const novo = `${nome}-${indice}.${extensao}`;
      let depois = `${caminho}/${nome}-${indice}.${extensao}`;
      fs.rename(antes, depois, () => {})
      this.guardaEndereco(novo, id);
      indice++;
      caminhos.push(depois);
    })

    var Client = require('ftp');
    let ftp = new Client();

    caminhos.forEach((caminho) => {
      ftp.on('ready', function() {

        let arquivo_destino = caminho.split('/')
        arquivo_destino = arquivo_destino[arquivo_destino.length-1]

        ftp.put(caminho, arquivo_destino, function(err) {
          if(err) console.log(err);
          ftp.end();
        });
      });
    })

    ftp.connect({
      host: process.env.FTP_HOST,
      port: process.env.FTP_PORT,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD
    })

    return true;
  },

  async guardaEndereco(novo, id){
    const imagem = await connection('imagens')
      .insert({
        url: novo,
        produto_id: id
      })
  },

  async removerImagem(id){
    const imagem = await connection('imagens')
      .where('imagem_id', id)
      .first();

    const deletar = await connection('imagens')
      .where('imagem_id', id)
      .del();

    var Client = require('ftp');
    let ftp = new Client();

    ftp.on('ready', function(){
      ftp.delete(imagem.url, (error) => {
        if(error){
          console.log("Erro de FTP delete: ", error)
        };
        ftp.end();
      })
    })

    ftp.connect({
      host: process.env.FTP_HOST,
      port: process.env.FTP_PORT,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD
    })

    return true;
  }
}
