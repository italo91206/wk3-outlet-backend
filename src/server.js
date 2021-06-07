import app from './app';
import config from './config';
import logger from './utils/logger';

async function startServer(){
    app.listen(config.port, err =>{
        if(err){
            logger.error(`Erro ao iniciar a aplicação: ${err.stack}`);
            process.exit(1);
        }
        logger.info(`Servidor rodando na porta: ${config.port}`)
    })
}

startServer();