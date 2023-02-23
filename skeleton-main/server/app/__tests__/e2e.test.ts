import dotenv from 'dotenv';
dotenv.config();

import request from 'supertest';
import initApp from '../loaders/app';
import express from 'express';
import { Sequelize } from 'sequelize';
import { getTestSequelizeInstance } from '../libs/db.config';
import connectDB from '../loaders/dbConnect';

let server: request.SuperAgentTest;
let testSequelize: Sequelize;

describe('App Test', () => {
  beforeAll(async () => {
    const app = await initApp(express());

    testSequelize = getTestSequelizeInstance(Sequelize);

    await connectDB(testSequelize);
    console.log('success connect TestDb')

    server = request.agent(app);
  });

  afterAll(async () => {
    await testSequelize.close();
  });

  it('hello world', async () => {
    const response = await server.get('/').expect(200);

    expect(response.body.message).toBe('hello World');
  });
});
