import http from 'http';
import { parse, unescape } from 'querystring';
import { appendFileSync, createReadStream, statSync } from 'fs';
import { extname } from 'path';

const server = http.createServer((req, res) => {
  /* TODO: 각각의 URL들을 어떻게 처리하면 좋을까요? */
  const [url, queryString] = unescape(req.url).split('?');
  const qsObj = parse(queryString);
  const urlList = url.split('/');
  const { method } = req;

  if (urlList[1] === '') {
    if (method === 'GET') {
      return res
        .setHeader('Content-Type', 'text/plain; charset=utf-8')
        .end('Hello World');
    }
  }

  if (urlList[1] === 'foo') {
    if (method === 'GET') {
      return res
        .setHeader('Content-Type', 'text/plain; charset=utf-8')
        .end(`Hello [${qsObj.bar}]`);
    }

    if (method === 'POST') {
      let body = '';

      req.on('data', (chunk) => {
        body += chunk;
      });

      req.on('end', () => {
        const bodyObj = JSON.parse(body);

        res
          .setHeader('Content-Type', 'text/plain; charset=utf-8')
          .end(`Hello [${bodyObj.bar}]`);
      });

      return;
    }
  }

  if (urlList[1] === 'pic') {
    if (urlList[2] === 'upload' && method === 'POST') {
      const filename = 'pic.' + req.headers['content-type'].split('/')[1];

      req.on('data', (chuck) => {
        console.log(`received chuck! ${chuck.length}`);
        appendFileSync(filename, chuck);
      });

      req.on('end', () => {
        console.log('upload');

        res
          .setHeader('Content-Type', 'application/json')
          .end(JSON.stringify({ ok: true }));
      });

      return;
    }

    if (urlList[2] === 'show' && method === 'GET') {
      const pathName = './pic.png';
      const readStream = createReadStream(pathName);
      const stat = statSync(pathName);

      res.writeHead(200, {
        'Content-Type': 'image/x-png',
        'Content-Length': stat.size,
      });

      // rs.pipe(res);
      readStream.on('data', (chuck) => {
        res.write(chuck);
      });

      readStream.on('end', () => {
        res.end();
      });

      return;
    }

    if (urlList[2] === 'download' && method === 'GET') {
      const pathName = './pic.png';
      const readStream = createReadStream(pathName);
      const stat = statSync(pathName);

      res.writeHead(200, {
        'Content-Type': 'image/x-png',
        'Content-disposition': 'attachment; filename=pic.png',
        'Content-Length': stat.size,
      });

      return readStream.pipe(res);
    }
  }

  res.setHeader('Content-Type', 'text/plain; charset=utf-8').end('Hello 404');
});

server.listen(8000);
