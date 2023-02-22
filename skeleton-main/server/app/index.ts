import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import initApp from './loaders/app';
import openHttpServer from './loaders/openHttpServer';
import getSequelizeInstance from './libs/db.config';
import connectDB from './loaders/dbConnect';
import { Main } from './types/main';
import { asyncGo } from './libs/utils';

const main: Main = async () => {
  console.log('Start Server');

  asyncGo(
    getSequelizeInstance(),
    connectDB
  );

  asyncGo(
    express(),
    initApp,
    openHttpServer
  );
};

main();
