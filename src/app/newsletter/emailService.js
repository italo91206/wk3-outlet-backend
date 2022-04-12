import produtoModel from '../produto/produtoModel';

const nodemailer = require('nodemailer')
const connection = require('../../database/connection');
const fs = require('fs')
const path = require('path');

export default {
  async enviarEmail(produto){

    const newsletter_list = await connection('newsletter')
      .where('produto_id', produto.produto_id)
      .select('cliente_email')

    let transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'comercial-teste@wk3outlet.italoferreira.dev.br',
        pass: 'A6#Fm83HGK5_rr.'
      }
    })

    let config = {
      from: '"Comercial WK3 Outlet" <comercial-teste@wk3outlet.italoferreira.dev.br>', // sender address
      to: "", // list of receivers
      subject: "Hello ✔", // Subject line
      //text: "Hello world?", // plain text body
      // html: "<b>Hello world?</b>", // html body
    }

    var caminho = path.join(__dirname, 'template.html');
    let file_content = fs.readFileSync(caminho, 'utf8')

    // __PRODUCT-IMAGE__
    // __PRODUCT-NAME__
    // __PRODUCT-LINK__
    let fallback_img = "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
    let base_url = "http://wk3outlet.italoferreira.dev.br"

    const novo_produto = await produtoModel.getProduto(produto.url)
    // console.log("novo_produto", novo_produto)

    file_content = file_content.replace('__PRODUCT-IMAGE__', novo_produto.imagens[0] ? novo_produto.imagens[0].url : fallback_img)
    file_content = file_content.replace('__PRODUCT-NAME__', novo_produto.nome_produto)
    file_content = file_content.replace('__PRODUCT-LINK__', base_url + "/p/" + novo_produto.url)

    newsletter_list.forEach(async (e) => {
      config.to = e.cliente_email
      config.html = file_content

      try {
        await transporter.sendMail(config);
      }
      catch(error){
        console.log(error)
      }
    })
  }
}
