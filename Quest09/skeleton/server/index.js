const express = require('express');
const app = express();

const indexRouter = require('./router');

const PROT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', (req, res, next) => {
  res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
  res.header("Access-Control-Allow-Methods", "GET,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    return res.json();
  }

  return next();
});

app.use('/', indexRouter);

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

app.listen(PROT, () => {
  console.log(`listening on port ${PROT}`);
});
