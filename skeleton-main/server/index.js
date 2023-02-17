require('dotenv').config();
require('./libs/db.config');

const http = require('http');
const https = require('node:https');
const express = require('express');
const fs = require('fs');
const app = express();

const { HTTP_PORT, HTTPS_PORT } = require('./libs/constant');
const setCorsHeader = require('./routes/middlewares/setCorsHeader');
const fileRouter = require('./routes/file.route');
const loginRouter = require('./routes/auth.route');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(setCorsHeader);

app.get('/', (req, res) => {
  res.json({ message: req.secure ? HTTPS_PORT : HTTP_PORT });
});

app.use('/file', fileRouter);
app.use('/auth', loginRouter);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;

  next(err);
});

app.use((err, req, res, next) => {
  console.error(err);

  const message = err.status || 'Internal Server Error';
  const status = err.status || 500;

  res.status(status).json({ error: message });
});

// http.createServer(app).listen(HTTP_PORT, () => {
//   console.log(`listening on port ${HTTP_PORT}`);
// });

const options = {
  key: fs.readFileSync('./localhost-key.pem'),
  cert: fs.readFileSync('./localhost.pem'),
};

https.createServer(options, app).listen(HTTPS_PORT);
