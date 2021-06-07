import config from '../../config';
import nodemailer from 'nodemailer';

var $usuario = config.emailEnvio.usuario;
var $senha = config.emailEnvio.senha;

function connectEmail() {
  var transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: $usuario,
      pass: $senha,
    },
  });
  return transporter;
}

export default {
  async ativaCadastro(emailDest, nome, token) {
    var $destinatario = emailDest;
    if (emailDest !== null) {
      const transporter = connectEmail();

      var mailOptions = {
        from: $usuario,
        to: $destinatario,
        subject: 'Confirme sua inscrição',
        //text: 'Muito fácil enviar um email pelo node, tente você também!',
        html: `
        <center>
        <table>
          <tbody>
            <tr>
              <td align="center">
                <img style="width: 23%;" src="cid:unique@kreata.ee" />
              </td>
            </tr>
            <tr>
              <td
                width="480"
                style="border: 2px solid #e8eaed; border-radius: 16px;"
              >
                <table
                  border="0"
                  cellspacing="0"
                  cellpadding="0"
                  width="100%"
                  style="
                    padding: 20px;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
                      'Helvetica Neue', sans-serif;
                  "
                >
                  <tbody align="center" style="font-size: 16px">
                    <tr>
                      <td>
                        <h3>Olá ${nome}</h3>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Você iniciou seu cadastro no LauTec com o e-mail:
                        ${emailDest}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-top: 20px;">
                        Para finaliza-lo, precisamos que você valide seu email.
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-top: 20px;">
                        Para validar, clique no botão abaixo:
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-top: 20px; padding-bottom: 20px;">
                        <a
                          href="${config.frontend.link}:${config.frontend.port}/ativacadastro/${token}"
                          style="
                            background-color: #01a49c;
                            border: 1px solid #01a49c;
                            border-radius: 4px;
                            color: #ffffff;
                            display: inline-block;

                            line-height: 25px;
                            text-decoration: none;
                            padding: 7px 24px 7px 24px;
                            font-weight: 500;
                            text-align: center;
                            word-break: normal;
                            direction: ltr;
                          "
                          target="_blank"
                          >Ativar cadastro</a
                        >
                      </td>
                    </tr>
                    <tr>
                      <td
                        width="480"
                        style="
                          padding: 5px;
                          border: 2px solid #e8eaed;
                          border-radius: 16px;
                          background-color: #01a49c;
                          color: white;
                          font-size: 11px;
                        "
                      >
                        Equipe LauTec - Tecnologia para Laudos
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </center>
        `,
        attachments: [
          {
            filename: 'logo-exemplo.png',
            path: __dirname + '/logo-exemplo.png',
            cid: 'unique@kreata.ee', //same cid value as in the html img src
          },
        ],
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email enviado: ' + info.response);
        }
      });
    }
  },

  async esqueceuSenha(emailDest, token, nome) {
    var $destinatario = emailDest;
    if (emailDest !== null) {
      const transporter = connectEmail();

      var mailOptions = {
        from: $usuario,
        to: $destinatario,
        subject: 'Esqueceu sua senha?',
        html: `
        <center>
          <table>
            <tbody>
              <tr>
                <td align="center">
                  <img style="width: 23%;" src="cid:unique@kreata.ee" />
                </td>
              </tr>
              <tr>
                <td
                  width="480"
                  style="border: 2px solid #e8eaed; border-radius: 16px;"
                >
                  <table
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                    width="100%"
                    style="
                      padding: 20px;
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                        Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
                        'Helvetica Neue', sans-serif;
                    "
                  >
                    <tbody align="center" style="font-size: 16px">
                      <tr>
                        <td>
                          <h3>Olá ${nome}</h3>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Recebemos um pedido para alteração de senha, caso tenha
                          solicitado clique no botão abaixo
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-top: 20px;">
                          <a href="${config.frontend.link}:${config.frontend.port}/recuperasenha/${token}"
                            style="
                              background-color: #01a49c;
                              border: 1px solid #01a49c;
                              border-radius: 4px;
                              color: #ffffff;
                              display: inline-block;

                              line-height: 25px;
                              text-decoration: none;
                              padding: 7px 24px 7px 24px;
                              font-weight: 500;
                              text-align: center;
                              word-break: normal;
                              direction: ltr;
                            "
                            target="_blank"
                            >Recuperar senha</a
                          >
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-top: 20px; padding-bottom: 20px; ">
                          Se tiver problemas, copie e cole o link abaixo em outra
                          janela do seu navegador:
                          <a href="${config.frontend.link}:${config.frontend.port}/recuperasenha/${token}">${config.frontend.link}:${config.frontend.port}/recuperasenha/${token}</a>
                        </td>
                      </tr>
                      <tr>
                        <td
                          width="480"
                          style="
                            padding: 5px;
                            border: 2px solid #e8eaed;
                            border-radius: 16px;
                            background-color: #01a49c;
                            color: white;
                            font-size: 11px;
                          "
                        >
                          Equipe LauTec - Tecnologia para Laudos
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </center>
        `,
        attachments: [
          {
            filename: 'logo-exemplo.png',
            path: __dirname + '/logo-exemplo.png',
            cid: 'unique@kreata.ee', //same cid value as in the html img src
          },
        ],
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email enviado: ' + info.response);
        }
      });
    }
  },
};
