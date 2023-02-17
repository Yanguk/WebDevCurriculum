require('dotenv').config();
require('./libs/db.config');

const express = require('express');
const app = express();

const { PORT } = require('./libs/constant');
const setCorsHeader = require('./routes/middlewares/setCorsHeader');
const fileRouter = require('./routes/file.route');
const loginRouter = require('./routes/auth.route');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(setCorsHeader);

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

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
