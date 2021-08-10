import dotenv from 'dotenv';

// Deixando o NODE_ENV como 'development' por padrão
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (!envFound) {
  // Esse erro deve travar todo o processo
  throw new Error('Arquivo .env não encontrado!');
}

export default {
  /**
   * Definindo a porta
   */
  port: parseInt(process.env.APP_PORT, 10),

  // frontend: {
  //   link: process.env.API_URL_FRONT,
  //   port: parseInt(process.env.PORT_FRONT, 10),
  // },

  token: {
    SECRET_KEY: process.env.SECRET_KEY,
    expiration: parseInt(process.env.EXPIRATION, 10),
  },

  tokenRecuperaSenha: {
    SECRET_KEY: process.env.SECRET_KEY_RECUPERA,
    expiration: parseInt(process.env.EXPIRATION_RECUPERA, 10),
  },

  tokenAtivaConta: {
    SECRET_KEY: process.env.SECRET_KEY_ATIVA_CONTA,
  },

  /**
   * Configurações do banco de dados
   */
  postgresSQLConfig: {
    defaultUser: process.env.PGUSER,
    defaultPasswd: process.env.PGPASSWORD,
    defaultDatabase: process.env.PGDATABASE,
    connectString: process.env.PGHOST,
  },
};
