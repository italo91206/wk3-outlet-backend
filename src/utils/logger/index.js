import winston from 'winston';
import moment from 'moment';

class Logger {
  constructor() {
    this.defaultLogger();
    this.httpLogger();
  }

  defaultLogger() {
    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp({
          format: () =>
            moment().subtract(3, 'hours').format('DD/MM/YYYY HH:mm:ss'),
        }),
        winston.format.printf(
          info =>
            `${info.timestamp} | ${info.level.toUpperCase()} | ${info.message}`
        )
      ),
      transports: [new winston.transports.Console()],
    });
  }

  httpLogger() {
    this.logger.stream = {
      write: message =>
        this.logger.log(
          'info',
          message.substring(0, message.lastIndexOf('\n'))
        ),
    };
  }
}

export default new Logger().logger;
