import { Application } from 'express';
import http from 'node:http';
import https from 'node:https';

import { readFileSync } from 'node:fs';
import { HTTPS_PORT, HTTP_PORT } from '../libs/constant';
import { migrationDb } from '../libs/db.config';

const openHttpServer = async (app: Application) => {
  await migrationDb();

  http.createServer(app).listen(HTTP_PORT, () => {
    console.log(`listening on port HTTP ${HTTP_PORT}`);
  });

  const options = {
    key: readFileSync('./localhost-key.pem'),
    cert: readFileSync('./localhost.pem'),
  };

  https.createServer(options, app).listen(HTTPS_PORT, () => {
    console.log(`listening on port HTTPS ${HTTPS_PORT}`);
  });
};

export default openHttpServer;
