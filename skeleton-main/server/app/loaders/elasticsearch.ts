import { Client } from '@elastic/elasticsearch';

let client: any;

// todo: 정리필요

if (process.env.NODE_ENV !== 'test') {
  client = new Client({
    node: 'http://server-elasticsearch:9200',
    maxRetries: 5,
    requestTimeout: 60000,
    sniffOnStart: true,
  });

  const bootstrap = async () => {
    try {
      client.ping();
      logger('9200번 포트 연결');
    } catch (e) {
      console.log(e);
    }
  };

  bootstrap();
}

async function logger(message: string) {
  if (process.env.NODE_ENV !== 'test') {
    console.log(message);

    await client.index({
      index: 'logger',
      document: {
        topic: 'logger-test',
        message,
        timestamp: new Date(),
      },
    });
  }
}

export default logger;
// Let's start by indexing some data
// await client.index({
//   index: 'game-of-thrones',
//   document: {
//     character: 'Ned Stark',
//     quote: 'Winter is coming.',
//   },
// });
