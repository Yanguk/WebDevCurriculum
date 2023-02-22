import cluster from 'cluster';
import { cpus } from 'os';
import { range } from '../libs/utils';
import { ArityFunction } from '../types/Pipe';

export default async function runCluster(main: ArityFunction) {
  if (cluster.isPrimary) {
    const numCPUs = cpus().length;

    console.log('cpu 갯수: ', numCPUs);

    console.log(`Primary ${process.pid} is running`);

    // Fork workers.
    range(numCPUs).forEach(() => cluster.fork());

    cluster.on('exit', (worker, _code, _signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    main();

    console.log(`Worker ${process.pid} started`);
  }
}
