import { Client } from '@elastic/elasticsearch';
import { ElasticsearchTransport } from 'winston-elasticsearch';
import winston, { format } from 'winston';

const getLogger = () => {
  if (process.env.NODE_ENV === 'test') {
    return {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      info: () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      error: () => {},
    };
  }

  const esClient = new Client({
    node: 'http://server-elasticsearch:9200',
    maxRetries: 5,
    requestTimeout: 60000,
    sniffOnStart: true,
  });

  const esTransport = new ElasticsearchTransport({
    index: 'logger',
    client: esClient,
  });

  //     await client.index({
  //       index: 'logger',
  //       document: {},
  //     });

  const logger = winston.createLogger({
    level: 'info',
    transports: [
      esTransport,
      new winston.transports.Console({
        format: format.combine(
          format.colorize(),
          format.printf((info) => `[${info.level}] ${info.message}`),
        ),
      }),
    ],
  });

  const bootstrap = async () => {
    try {
      await esClient.ping();
      logger.info('elasticSearch 연결');
    } catch (err) {
      logger.info(err);
    }
  };

  bootstrap();

  return logger;
};

const logger = getLogger();

export default logger;

// async function logger(message: string) {
//   if (process.env.NODE_ENV !== 'test') {
//     console.log(message);

//     await client.index({
//       index: 'logger',
//       document: {
//         topic: 'logger-test',
//         message,
//         timestamp: new Date(),
//       },
//     });
//   }
// }

// export default logger;
// // Let's start by indexing some data
// await client.index({
//   index: 'game-of-thrones',
//   document: {
//     character: 'Ned Stark',
//     quote: 'Winter is coming.',
//   },
// });
