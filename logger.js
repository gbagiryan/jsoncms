const { createLogger, transports, format } = require('winston');

const { combine, timestamp, prettyPrint, colorize, errors, } = format;

const logger = createLogger({

  level: 'info',
  format: combine(
    errors({ stack: true }),
    colorize(),
    timestamp(),
    prettyPrint(),
    format.json()
  ),

  transports: [
    new transports.Console({ level: 'error' }),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' })
  ]
});

module.exports = logger;
