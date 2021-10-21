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

  async salvarImagens(files, id) {
    // console.log(id)
    // console.log(files)
    const produto = await connection('produtos')
      .where('produto_id', id)
      .select('nome')
      .first();
    
    
    const nome = slugify(produto.nome, { remove: /[*+~.()'"!:@]/g, lower: true });
    console.log(nome);
    let indice = 1;
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
    })

    let Client = require('ssh2-sftp-client');
    let sftp = new Client();

    sftp.connect({
      host: process.env.FTP_HOST,
      port: process.env.FTP_PORT,
      username: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD
    })
    // .then(()=> { return sftp.list('') })
    // .then((data)=> { console.log(data) })
    .catch((err) => { console.log(err) })

    return true;
  },

  async guardaEndereco(novo, id){
    console.log('id: ' + id);
    console.log(novo);

    const imagem = await connection('imagens')
      .insert({
        url: novo,
        produto_id: id
      })
  }
}