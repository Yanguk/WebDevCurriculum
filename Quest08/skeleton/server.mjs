import http from 'http';
import qs from 'querystring';
import fs from 'node:fs/promises';

const server = http.createServer((req, res) => {
  /* TODO: 각각의 URL들을 어떻게 처리하면 좋을까요? */
  const [url, queryString] = qs.unescape(req.url).split('?');
  const qsObj = qs.parse(queryString);
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
      let filename = req.headers['filename'];

      if (filename == null) {
        filename = 'file.' + req.headers['content-type'].split('/')[1];
      }

      const stream = fs.createWriteStream(`${__dirname}/${filename}`);
      stream.pipe()

      res.setHeader('Content-Type', 'text/html; charset=utf-8').end(`hi`);

      return;
    }

    if (urlList[2] === 'show' && method === 'GET') {
      return res
        .setHeader('Content-Type', 'text/plain; charset=utf-8')
        .end('hello show');
    }

    if (urlList[2] === 'download' && method === 'GET') {
      return res
        .setHeader('Content-Type', 'text/plain; charset=utf-8')
        .end('hello download');
    }
  }

  res.setHeader('Content-Type', 'text/plain; charset=utf-8').end('Hello 404');
});

server.listen(8000);
