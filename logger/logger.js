const { createLogger, transports, format } = require('winston');

const { combine, timestamp, prettyPrint, errors } = format;

const logger = createLogger({

  level: 'info',
  format: combine(
    errors({ stack: true }),
    timestamp(),
    prettyPrint(),
    format.json()
  ),

  transports: [
    new transports.Console({ level: 'error' }),
    new transports.File({ filename: './logs/error.log', level: 'error', maxsize: 1000000 }),
    new transports.File({ filename: './logs/combined.log', maxsize: 1000000 })
  ]
});

module.exports = logger;
