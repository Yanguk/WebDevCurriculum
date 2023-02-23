import { parseCookies } from '../lib';
import { SERVER_URL } from '../lib/constants';

const signup = async (body) => {
  try {
    const response = await fetch(`${SERVER_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });

    return response.json();
  } catch (err) {
    console.error(err);

    return false;
  }
};

// 로그인을 하여서 쿠키를 얻어옴
const loginJWT = async (body) => {
  const response = await fetch(`${SERVER_URL}/auth/login/jwt`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!data.ok) {
    throw new Error('로그인실패');
  }

  return data;
};

const loginSession = async (body) => {
  try {
    await fetch(`${SERVER_URL}/auth/login/session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(body),
    });

    return true;
  } catch (err) {
    console.error('세션 로그인 에러');

    return false;
  }
};

const loginCheck = async () => {
  try {
    const tokenInfo = parseCookies(document.cookie);
    const token = tokenInfo['jwt'] ?? '';

    // credentials 이란 쿠키, auth 등등 을 말하며 크로스오리진에서 가능할라면 include속성을 줍니다.
    const response = await fetch(`${SERVER_URL}/auth`, {
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();

    return result;
  } catch (err) {
    console.error(err);
    console.error('로그인 체크 에러');

    return false;
  }
};

const logout = async () => {
  const tokenInfo = parseCookies(document.cookie);
  const token = tokenInfo['jwt'];

  // jwt: 클라이언트에서 토큰삭제;
  if (token) {
    document.cookie = 'jwt=; max-age=0;';

    return;
  }

  // session: 서버에서 세션 삭제;
  const response = await fetch(`${SERVER_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  await response.json();
};

export default {
  signup,
  loginJWT,
  loginCheck,
  logout,
  loginSession,
};
