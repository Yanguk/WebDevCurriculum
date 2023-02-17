const router = require('express').Router();

const authController = require('./controllers/auth.controller');

router.get('/', authController.checkIsLogin);

router.post('/signup', authController.signUp);

router.post('/login/jwt', authController.loginAndGetJWT);

router.post('/login/session', authController.loginWithSession);

router.post('/logout', authController.logout);

module.exports = router;
