import { Application, NextFunction, Request, Response } from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';

import { setCorsHeader } from '../routes/middlewares/setCorsHeader';
import fileRouter from '../routes/file.route';
import authRouter from '../routes/auth.route';
import apolloServer from '../graphql';
import graphqlOption from '../graphql/middleware';
import StatusError from '../types/Error';

export default async function initApp(app: Application): Promise<Application> {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(setCorsHeader);

  app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'hello World' });
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

  return app;
}
