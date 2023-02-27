import { Sequelize } from 'sequelize';

import express from 'express';
import dotenv from 'dotenv';

import initApp from './loaders/app';
import openHttpServer from './loaders/openHttpServer';
import getSequelizeInstance from './libs/db.config';
import connectDB from './loaders/dbConnect';
import logger from './libs/logger';

const main = async () => {
  dotenv.config();

  logger.info('Start Server');

  Promise.resolve(Sequelize)
    .then(getSequelizeInstance)
    .then(connectDB);

  Promise.resolve(express())
    .then(initApp)
    .then(openHttpServer);
};

main();
