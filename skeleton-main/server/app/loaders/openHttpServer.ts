import { Application } from 'express';
import http from 'node:http';
import https from 'node:https';

import { readFileSync } from 'node:fs';
import { HTTPS_PORT, HTTP_PORT } from '../libs/constant';
import logger from './elasticsearch';

const openHttpServer = async (app: Application) => {

  http.createServer(app).listen(HTTP_PORT, () => {
    logger(`listening on port HTTP ${HTTP_PORT}`);
  });

  const options = {
    key: readFileSync('./localhost-key.pem'),
    cert: readFileSync('./localhost.pem'),
  };

  https.createServer(options, app).listen(HTTPS_PORT, () => {
    logger(`listening on port HTTPS ${HTTPS_PORT}`);
  });

  return app;
};

export default openHttpServer;
