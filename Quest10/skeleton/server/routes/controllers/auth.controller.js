const { parseCookies } = require('../../libs');
const session = require('../../model/session');
const jwt = require('jsonwebtoken');

const PRIVATE_KEY = 'secret';

const password = '1234';

const userInfo = {
  heo: {
    password,
  },
  kim: {
    password,
  },
  park: {
    password,
  },
};

const checkIsLogin = (req, res, next) => {
  // jwt쿠키 확인
  const token = req.headers.authorization.split(' ')[1];

  if (token) {
    // toDo: 검증되지않은 토큰일때 에러처리
    const decoded = jwt.verify(token, PRIVATE_KEY);

    return res.json({ ok: true, id: decoded.id });
  }

  // jwt가 없을때 세션 로그인 확인
  const cookieObj = parseCookies(req.headers.cookie);

  if (cookieObj['session']) {
    const sessionId = cookieObj['session'];

    const userId = session.get(sessionId);

    return res.json({ ok: true, id: userId });
  }

  res.json({ ok: false });
};

// 토큰!
const loginAndGetJWT = (req, res, next) => {
  const { id, password } = req.body;

  // 유효성 검사...
  if (!userInfo[id] || userInfo[id].password !== password) {
    return res
      .status(400)
      .json({ ok: false, message: '유저정보가 잘못되었습니다.' });
  }

  const token = jwt.sign({ id }, PRIVATE_KEY);

  res.json({ ok: true, token });
};

// 세션!
const loginWithSession = (req, res, next) => {
  const { id: userId, password } = req.body;

  // 유효성 검사...
  if (!userInfo[userId] || userInfo[userId].password !== password) {
    return res
      .status(400)
      .json({ ok: false, message: '유저정보가 잘못되었습니다.' });
  }

  const sessionId = session.set(userId);

  const sessionCookieOption = {
    httpOnly: true,
    // secure: true,
  };

  res.cookie('session', sessionId, sessionCookieOption);
  res.json({ ok: true, message: '로그인 세션' });
};

const logout = (req, res, next) => {
  const cookieObj = parseCookies(req.headers.cookie);
  // 쿠키 삭제
  res.clearCookie('jwt');

  // session에 있는 유저 정보 삭제 및 쿠키에 있는 세션 삭제;
  const sessionId = cookieObj['session'];
  session.delete(sessionId);

  res.clearCookie('session');
  res.json({ ok: true, message: '로그아웃' });
};

module.exports = {
  checkIsLogin,
  loginWithJWT: loginAndGetJWT,
  loginWithSession,
  logout,
};
