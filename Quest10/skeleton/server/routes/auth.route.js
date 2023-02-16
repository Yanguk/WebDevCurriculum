const router = require('express').Router();
const session = require('../model/session');

const authController = require('./controllers/auth.controller');

router.get('/', authController.checkIsLogin);

router.post('/login/jwt', authController.loginWithJWT);

router.post('/login/session', authController.loginWithSession);

router.post('/logout', authController.logout);

module.exports = router;
