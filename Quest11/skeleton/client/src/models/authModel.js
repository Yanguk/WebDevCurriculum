import apiModel from './apiModel';

// export const userList = ['heo', 'kim', 'park'];

// const password = 1234;

// export const userInfo = {
//   heo: {
//     password,
//   },
//   kim: {
//     password,
//   },
//   park: {
//     password,
//   },
// };

const isLogin = async () => {
  try {
    const result = await apiModel.loginCheck();

    return result;
  } catch (err) {
    console.error('로그인 체크 에러');

    return false;
  }
};

export default {
  isLogin,
};
