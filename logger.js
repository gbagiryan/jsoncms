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
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console());
}

module.exports = logger;
