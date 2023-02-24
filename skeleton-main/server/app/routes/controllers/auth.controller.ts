import { RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import {
  parseCookies,
  createHashedPassword,
  verifyPassword,
} from '../../libs/utils';
import UserRequest from '../../types/UserRequest';
import * as session from '../../libs/session';
import User from '../../models/User';
import { PRIVATE_KEY } from '../../libs/constant';

export const checkIsLogin: RequestHandler = (req: UserRequest, res, _next) => {
  /** jwt쿠키 확인 */
  const token = req?.headers?.authorization?.split(' ')[1];

  if (token) {
    // toDo: 검증되지않은 토큰일때 에러처리
    const decoded = jwt.verify(token, PRIVATE_KEY) as JwtPayload;

    return res.json({ ok: true, name: decoded.name });
  }

  /** jwt가 없을때 세션 로그인 확인 */
  if (req.headers.cookie) {
    const cookieObj = parseCookies(req.headers.cookie);

    if (cookieObj['session']) {
      const sessionId = cookieObj['session'];

      const userName = session.get(sessionId);

      return res.json({ ok: true, name: userName });
    }
  }

  res.status(400).json({ ok: false });
};

export const loginAndGetJWT: RequestHandler = async (
  req: UserRequest,
  res,
  next,
) => {
  try {
    const { name, password } = req.body;

    // 유저 검증...
    const targetUser = await User.findOne({ where: { name } });

    if (!targetUser) {
      throw new Error('존재하는 않은 유저 Id');
    }

    if (
      !(await verifyPassword(password, targetUser.salt, targetUser.password))
    ) {
      throw new Error('비밀번호가 틀렸습니다');
    }

    // 토큰 발급...
    const token = jwt.sign({ id: targetUser.dataValues.id, name }, PRIVATE_KEY);

    res.json({ ok: true, token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ ok: false, message: error.message });
    } else {
      next(error);
    }
  }
};

export const loginWithSession: RequestHandler = async (
  req: UserRequest,
  res,
  next,
) => {
  try {
    const { name, password } = req.body;

    // 유저 검증...
    const targetUser = await User.findOne({ where: { name } });

    if (!targetUser) {
      throw new Error('존재하는 않은 유저 Id');
    }

    if (!verifyPassword(password, targetUser.salt, targetUser.password)) {
      throw new Error('비밀번호가 틀렸습니다');
    }

    // 주로 passport 의 인증 라이브러리와 express-session라이브러리를 사용하지만
    // 여기선 학습의도로 간단하게 추상화만 시켜서 진행하였음.
    // 존재하는 유저면 session Id를 쿠키에 넣어서 발급
    const sessionId = session.set(name);

    const sessionCookieOption = {
      httpOnly: true,
      // secure: true,
    };

    res.cookie('session', sessionId, sessionCookieOption);
    res.json({ ok: true, message: '로그인 세션' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ ok: false, message: error.message });
    } else {
      next(error);
    }
  }
};

export const logout: RequestHandler = (req, res, _next) => {
  const cookieObj = parseCookies(req.headers.cookie as string);
  // 쿠키 삭제
  res.clearCookie('jwt');

  // session에 있는 유저 정보 삭제 및 쿠키에 있는 세션 삭제;
  const sessionId = cookieObj['session'];
  session.remove(sessionId);

  res.clearCookie('session');
  res.json({ ok: true, message: '로그아웃' });
};

export const signUp: RequestHandler = async (req, res, next) => {
  try {
    const { name, password } = req.body;

    const isExistedId = !!(await User.findOne({ where: { name } }));

    if (isExistedId) {
      throw new Error('존재하는 유저 Id');
    }

    // 유저 비밀번호 암호화 하기
    const { salt, hashedPassword } = await createHashedPassword(password);

    // 유저 등록하기
    const user = await User.create({
      name,
      password: hashedPassword,
      salt,
    });

    res.json({
      ok: true,
      user: { id: user.dataValues.id, name: user.dataValues.name },
    });
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      res.status(400).json({ ok: false, message: error.message });
    } else {
      next(error);
    }
  }
};
