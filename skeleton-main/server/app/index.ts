import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import initApp from './loaders/app';
import openHttpServer from './loaders/openHttpServer';

import cluster from 'node:cluster';
import process from 'node:process';
import { cpus } from 'node:os';
import { range } from './libs/utils';

const numCPUs = cpus().length;

console.log('cpu 갯수: ', numCPUs);

async function main() {
  if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    // Fork workers.
    range(numCPUs).forEach(() => cluster.fork());

    cluster.on('exit', (worker, _code, _signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    initApp(express()).then(openHttpServer);

    console.log(`Worker ${process.pid} started`);
  }
}

main();
