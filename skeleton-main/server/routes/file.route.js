const router = require('express').Router();
const fileController = require('./controllers/file.controller');
const verifyToken = require('./middlewares/verifyToken');

router
  .use(verifyToken)
  .route('/')
  .get(fileController.getAll)
  .post(fileController.addFile)
  .delete(fileController.deleteFile);

module.exports = router;
