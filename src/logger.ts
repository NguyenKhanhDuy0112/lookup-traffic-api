import * as winston from 'winston';
import 'winston-daily-rotate-file';

import * as fs from 'fs';
import * as path from 'path';

const logDir = 'logs';
const datePattern = 'YYYY-MM-DD-HH';
if (!fs.existsSync(logDir)) {
  // Create the directory if it does not exist
  fs.mkdirSync(logDir);
}

const transport = new winston.transports.DailyRotateFile({
  filename: path.join(logDir, 'log-%DATE%.log'),
  datePattern,
  zippedArchive: false,
});
transport.on('rotate', (oldFilename, newFilename) => {
  console.log('log all', oldFilename, newFilename);
});
const errorTransport = new winston.transports.DailyRotateFile({
  filename: path.join(logDir, 'error-%DATE%.log'),
  datePattern,
  zippedArchive: false,
  level: 'error',
});

const loggerWinston = winston.createLogger({
  level: 'info',
  // defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.json(),
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
      ),
    }),
    transport,
    errorTransport,
  ],
});

const loggerAction = (level, message) => {
  const errorMessage = `(${new Date().toISOString()}) ${message}`;
  console.error(errorMessage);
  loggerWinston.log({
    level,
    message: errorMessage,
  });
};

export const logger = {
  error: (message) => { loggerAction('error', message); },
  warn: (message) => { loggerAction('warn', message); },
  info: (message) => { loggerAction('info', message); },
  http: (message) => { loggerAction('http', message); },
  verbose: (message) => { loggerAction('verbose', message); },
  debug: (message) => { loggerAction('debug', message); },
  silly: (message) => { loggerAction('silly', message); },
};
