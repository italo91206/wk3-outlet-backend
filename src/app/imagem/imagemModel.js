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

  async salvarImagens(files_name, id) {
    // console.log(files_name)

    const produto = await connection('produtos')
      .where('produto_id', id)
      .select('nome_produto')
      .first();

    const caminhos = [];
    var caminho = path.join(__dirname, '../../public');
    let rules = { remove: /[*+~.()'"!:@]/g, replacement: '-', lower: true }
    let nome = produto.nome_produto.slice(0, 89)
    let indice = 0;

    nome = slugify(produto.nome_produto, rules );
    // console.log("nome:", nome)
    // let indice = await this.getImagesIndex(id);

    files_name.forEach(async (file) => {
      let data = slugify("" + new Date().toISOString(), rules)
      const original = file.caminho_final;
      const extensao = original.split('.')[1];
      const antes = `${caminho}\\${original}`;
      const novo = `${nome}-${indice}-${data}.${extensao}`;
      let depois = `${caminho}\\${novo}`;
      // console.log("meu caminho antes: " + antes)
      // console.log("meu caminho depois: " + depois)
      fs.rename(antes, depois, (err) => {
        if(err){
          console.log(err)
          throw err
        }
        else
          console.log('File renamed')
      })
      this.guardaEndereco(novo, id);
      indice++;
      caminhos.push(depois);
    })

    //console.log("caminhos", caminhos)

    var Client = require('ftp');
    let ftp = new Client();

    caminhos.forEach((caminho) => {
      ftp.on('ready', function() {
        //console.log("arquivo_destino: " + caminho)
        let arquivo_destino = caminho.split("\\")
        //console.log(arquivo_destino)
        arquivo_destino = arquivo_destino[arquivo_destino.length-1]

        ftp.put(caminho, `static/${arquivo_destino}`, function(err) {
          if(err){
            console.log("Erro na função salvarImagens !")
            console.log(err)
          }
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
      console.log("Deletar caminho: " + imagem.url)
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
