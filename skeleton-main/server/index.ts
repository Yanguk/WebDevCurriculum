import dotenv from 'dotenv';
dotenv.config();

import './libs/db.config';
import { NextFunction, Request, Response } from 'express';
import http from 'node:http';
import https from 'node:https';
import express from 'express';
import { readFileSync } from 'node:fs';
import { expressMiddleware } from '@apollo/server/express4';

const app = express();

import { setCorsHeader } from './routes/middlewares/setCorsHeader';
import StatusError from './types/Error';
import { HTTPS_PORT, HTTP_PORT } from './libs/constant';
import fileRouter from './routes/file.route';
import authRouter from './routes/auth.route';
import apolloServer from './graphql';
import graphqlOption from './graphql/option';

async function main() {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(setCorsHeader);

  app.get('/', (req: Request, res: Response) => {
    res.json({ message: req.secure ? HTTPS_PORT : HTTP_PORT });
  });

  app.use('/file', fileRouter);
  app.use('/auth', authRouter);

  await apolloServer.start();

  app.use('/graphql', expressMiddleware(apolloServer, graphqlOption));

  app.use((req: Request, res: Response, next: NextFunction) => {
    const err: StatusError = new Error('Not Found');
    err.status = 404;

    next(err);
  });

  app.use((err: StatusError, req: Request, res: Response) => {
    console.error(err);

    const message = err.status || 'Internal Server Error';
    const status = err.status || 500;

    res.status(status).json({ error: message });
  });

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
}

main();
