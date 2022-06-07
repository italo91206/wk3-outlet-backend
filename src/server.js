import app from './app';
import config from './config';
import logger from './utils/logger';

async function startServer() {
  app.listen(config.port, err => {
    if (err) {
      logger.error(`Erro ao iniciar a aplicação: ${err.stack}`);
      process.exit(1);
    }
    else {
      logger.info(`running in ${process.env.NODE_ENV} environment`)
      logger.info(`Servidor rodando na porta: ${config.port}`)
    }
  })
}

process.on('uncaughtException', (error, origin) => {
  console.log(`\n${origin} signal received`)
  console.log(error)
})

startServer();
