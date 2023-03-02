import dotenv from 'dotenv';
import request from 'supertest';
import express from 'express';
import { Sequelize } from 'sequelize';

import { getTestSequelizeInstance } from '../libs/db.config';
import { File } from '../models';
import initApp from '../loaders/app';
import connectDB from '../loaders/dbConnect';
import { Maybe } from 'uk-fp';

dotenv.config();

describe('App E2E Test', () => {
  let server: request.SuperAgentTest;
  let testSequelize: Sequelize;
  let token: string;

  const admin = {
    id: 0,
    name: 'admin',
    password: 'admin',
  };

  beforeAll(async () => {
    const app = await initApp(express());
    server = request.agent(app);
    testSequelize = getTestSequelizeInstance(Sequelize);
  });

  afterAll(async () => {
    await testSequelize.drop();
    await testSequelize.close();
  });

  it('connect To TestDB', async () => {
    await expect(connectDB(testSequelize)).resolves.toBeUndefined();
  });

  it('hello world', async () => {
    const response = await server.get('/').expect(200);

    expect(response.body.message).toBe('hello World');
  });

  describe('\nAuth Test', () => {
    it('POST "/auth/signup"', async () => {
      const response = await server.post('/auth/signup').send(admin).expect(200);

      const { ok, user } = response.body;

      admin.id = user.id;

      expect(user.name).toBe(admin.name);
      expect(ok).toBeTruthy();
    });

    it('POST "/auth/login/jwt"', async () => {
      const response = await server.post('/auth/login/jwt').send(admin).expect(200);

      expect(response.body.ok).toBeTruthy();

      token = `Bearer ${response.body.token}`;
    });
  });

  describe('\nFile Test', () => {
    const file1 = {
      name: 'file1',
      content: 'hello World',
    };

    const file2 = {
      name: 'file2',
      content: 'hello World',
    };

    it('POST "/file"', async () => {
      const response = await server
        .post('/file')
        .set('Authorization', token)
        .send(file1)
        .expect(200);

      const result = response.body;

      expect(result.ok).toBeTruthy();
      expect(result.data.name).toBe(file1.name);
      expect(result.data.content).toBe(file1.content);

      const response2 = await server
        .post('/file')
        .set('Authorization', token)
        .send(file2)
        .expect(200);

      const result2 = response2.body;

      expect(result2.ok).toBeTruthy();
      expect(result2.data.name).toBe(file2.name);
      expect(result2.data.content).toBe(file2.content);
    });

    it('GET "/file"', async () => {
      const response = await server.get('/file').set('Authorization', token).expect(200);

      const files = response.body.data;
      const targetFile = files[0];

      expect(targetFile.owner).toBe(admin.id);
      expect(targetFile['User'].name).toBe(admin.name);
      expect(targetFile.name).toBe(file1.name);
    });

    it('PUT "/file"', async () => {
      const fileData = Maybe.wrap(await File.findOne({ where: { name: file1.name } })).unwrap();

      const targetFile = fileData.dataValues;

      const putInput = {
        id: targetFile.id,
        name: 'newName',
        content: 'newContent',
      };

      const response = await server
        .put('/file')
        .set('Authorization', token)
        .send(putInput)
        .expect(200);

      const { ok } = response.body;

      const newFileData = Maybe.wrap(await File.findOne({ where: { id: targetFile.id } })).unwrap();

      const newData = newFileData.dataValues;

      expect(ok).toBeTruthy();
      expect(newData.name).toBe(putInput.name);
      expect(newData.content).toBe(putInput.content);
    });

    it('DELETE "/file"', async () => {
      const fileData = (await File.findAll())[0];

      const targetId = fileData.id;

      const response = await server
        .delete('/file')
        .set('Authorization', token)
        .send({ fileId: targetId })
        .expect(200);

      expect(response.body.ok).toBeTruthy();
      expect(await File.findOne({ where: { id: targetId } })).toBeNull();
    });
  });
});
