import { Sequelize } from 'sequelize';
import express from 'express';
import dotenv from 'dotenv';

import initApp from './loaders/app';
import openHttpServer from './loaders/openHttpServer';
import getSequelizeInstance from './libs/db.config';
import connectDB from './loaders/dbConnect';
import { Main } from './types/main';
import { asyncGo } from './libs/utils';

const main: Main = async () => {
  dotenv.config();

  console.log('Start Server');

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
