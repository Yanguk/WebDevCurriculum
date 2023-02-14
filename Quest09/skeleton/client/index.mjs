import { readFileSync } from 'fs';
import { createServer } from 'http';
import { join } from 'path';

const PORT = 3000;

const requestHandler = (req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/notepad.js') {
      const jsPath = './public/notepad.js';
      const jsFile = readFileSync(jsPath);

      res
        .writeHead(200, { 'Content-Type': 'text/javascript' })
        .end(jsFile);
    } else if (req.url === '/style.css') {
      const cssPath = './public/style.css';
      const cssFile = readFileSync(cssPath);

      res.writeHead(200, { 'Content-Type': 'text/css' }).end(cssFile);
    } else {
      const template = readFileSync('./public/index.html');
      console.log(req.url);
      res.writeHead(200, { 'Content-Type': 'text/html' }).end(template);
    }
  }
};

createServer(requestHandler).listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
