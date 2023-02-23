import { Router } from 'express';
import { verifyToken } from './middlewares/verifyToken';
import * as fileController from './controllers/file.controller';

const router = Router();

router
  .use(verifyToken)
  .route('/')
  .get(fileController.getAll)
  .post(fileController.addFile)
  .put(fileController.putFile)
  .delete(fileController.deleteFile);

export default router;
