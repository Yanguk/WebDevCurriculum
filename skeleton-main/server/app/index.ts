import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import initApp from './loaders/app';
import openHttpServer from './loaders/openHttpServer';

import cluster from 'node:cluster';
import process from 'node:process';
import { cpus } from 'node:os';

console.log(cluster.isPrimary); // 처음에는 true, 두번째는 fals

const numCPUs = cpus().length / 2;

async function main() {
  if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, _code, _signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    initApp(express()).then(openHttpServer);

    console.log(`Worker ${process.pid} started`);
  }
}

main();
