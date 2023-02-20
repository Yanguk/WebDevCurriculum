import { Router } from 'express';
import * as authController from './controllers/auth.controller';

const router = Router();

router.get('/', authController.checkIsLogin);

router.post('/signup', authController.signUp);

router.post('/login/jwt', authController.loginAndGetJWT);

router.post('/login/session', authController.loginWithSession);

router.post('/logout', authController.logout);

export default router;
