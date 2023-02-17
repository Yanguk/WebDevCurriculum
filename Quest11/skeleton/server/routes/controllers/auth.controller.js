const {
  parseCookies,
  createHashedPassword,
  verifyPassword,
} = require('../../libs');
const session = require('../../libs/session');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const PRIVATE_KEY = 'secret';

const checkIsLogin = (req, res, next) => {
  /** jwt쿠키 확인 */
  const token = req.headers.authorization.split(' ')[1];

  if (token) {
    // toDo: 검증되지않은 토큰일때 에러처리
    const decoded = jwt.verify(token, PRIVATE_KEY);

    return res.json({ ok: true, id: decoded.id });
  }

  /** jwt가 없을때 세션 로그인 확인 */
  const cookieObj = parseCookies(req.headers.cookie);

  if (cookieObj['session']) {
    const sessionId = cookieObj['session'];

    const userId = session.get(sessionId);

    return res.json({ ok: true, id: userId });
  }

  res.json({ ok: false });
};

const loginAndGetJWT = async (req, res, next) => {
  try {
    const { id, password } = req.body;

    // 유저 검증...
    const targetUser = await User.findOne({ where: { userId: id } });

    if (!targetUser) {
      throw new Error('존재하는 않은 유저 Id');
    }

    if (
      !(await verifyPassword(password, targetUser.salt, targetUser.password))
    ) {
      throw new Error('비밀번호가 틀렸습니다');
    }

    // 토큰 발급...
    const token = jwt.sign({ id }, PRIVATE_KEY);

    res.json({ ok: true, token });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};

const loginWithSession = async (req, res, next) => {
  try {
    const { id, password } = req.body;

    // 유저 검증...
    const targetUser = await User.findOne({ where: { userId: id } });

    if (!targetUser) {
      throw new Error('존재하는 않은 유저 Id');
    }

    if (!verifyPassword(password, targetUser.salt, targetUser.password)) {
      throw new Error('비밀번호가 틀렸습니다');
    }

    // 주로 passport 의 인증 라이브러리와 express-session라이브러리를 사용하지만
    // 여기선 학습의도로 간단하게 추상화만 시켜서 진행하였음.
    // 존재하는 유저면 session Id를 쿠키에 넣어서 발급
    const sessionId = session.set(id);

    const sessionCookieOption = {
      httpOnly: true,
      // secure: true,
    };

    res.cookie('session', sessionId, sessionCookieOption);
    res.json({ ok: true, message: '로그인 세션' });
  } catch (err) {
    res.state(400).json({ ok: false, message: err.message });
  }
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

const signUp = async (req, res, next) => {
  try {
    const { id, password } = req.body;

    const isExistedId = !!(await User.findOne({ where: { userId: id } }));

    if (isExistedId) {
      throw new Error('존재하는 유저 Id');
    }

    // 유저 비밀번호 암호화 하기
    const { salt, hashedPassword } = await createHashedPassword(password);

    // 유저 등록하기
    const user = await User.create({
      userId: id,
      password: hashedPassword,
      salt,
    });

    res.json({ ok: true, user: user.userId });
  } catch (error) {
    console.error(error);

    res.status(400).json({ ok: false, message: error.message });
  }
};

module.exports = {
  checkIsLogin,
  loginAndGetJWT,
  loginWithSession,
  logout,
  signUp,
};
