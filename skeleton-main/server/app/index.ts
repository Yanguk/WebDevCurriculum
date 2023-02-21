import express from 'express';
import { Application } from 'express';
import http from 'node:http';
import https from 'node:https';

import { readFileSync } from 'node:fs';
import { HTTPS_PORT, HTTP_PORT } from './libs/constant';

import dotenv from 'dotenv';
dotenv.config();

import initApp from './loaders/app';
import { connetDb } from './libs/db.config';

const openHttpServer = async (app: Application) => {
  await connetDb();

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

initApp(express()).then(openHttpServer);
