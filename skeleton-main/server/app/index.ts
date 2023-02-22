import { Sequelize } from 'sequelize';
import express from 'express';
import dotenv from 'dotenv';

import initApp from './loaders/app';
import openHttpServer from './loaders/openHttpServer';
import getSequelizeInstance from './libs/db.config';
import connectDB from './loaders/dbConnect';
import { asyncGo } from './libs/utils';

const main = async () => {
  dotenv.config();

  console.log('Start Server');

  asyncGo(
    Sequelize,
    getSequelizeInstance,
    connectDB
  );

  // pst1:
  /**
   * ## before:
   *  const app = express();
   *  const startedApp = await initApp(App);
   *
   *  openHttpServer(startedApp);
   */

  /**
   *  이것을 정리하고 싶다는 욕망에 체이닝을 하고싶었고,
   *  pipe, go 함수를 만들어서 사용하였습니다.
   *  여기서 type을 지정하는데 있어서 많은 어려움을 겪었습니다.
   *
   *  # Advanced: async 체이닝의 경우 에러처리는 어떻게 할수있는가에 대해서 생각해 볼 것
   */
  asyncGo(
    express(),
    initApp,
    openHttpServer,
  );
};

main();
