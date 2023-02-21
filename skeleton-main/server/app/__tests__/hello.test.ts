import dotenv from 'dotenv';
dotenv.config();

import request from 'supertest';
import initApp from '../loaders/app';
import express from 'express';

let server: request.SuperAgentTest;

describe('App Test', () => {
  beforeAll(async () => {
    const app = await initApp(express());

    server = request.agent(app);
  });

  it('hello world', async () => {
    const response = await server.get('/').expect(200);

    expect(response.body.message).toBe('hello World');
  });
});
