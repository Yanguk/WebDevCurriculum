import { Sequelize } from 'sequelize';
import express from 'express';
import dotenv from 'dotenv';

import initApp from './loaders/app';
import openHttpServer from './loaders/openHttpServer';
import getSequelizeInstance from './libs/db.config';
import connectDB from './loaders/dbConnect';
import { asyncGo } from './libs/utils';
import logger from './loaders/elasticsearch';

const main = async () => {
  dotenv.config();

  logger('Start Server');

  await asyncGo(
    Sequelize,
    getSequelizeInstance,
    connectDB
  );

  await asyncGo(
    express(),
    initApp,
    openHttpServer,
  );
};

main();
