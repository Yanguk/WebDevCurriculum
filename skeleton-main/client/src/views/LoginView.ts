// import apiModel from '../api/auth.api';

const render = () => {
  const template = `
    <section class="login-container">
      <h1> 로그인 기능 구현하기 </h1>
      <form onsubmit="return false;" class="login-form">
        <label for="id">아이디: </label>
        <input type="text" value="heo" id="id">
        <label for="password">비밀번호: </label>
        <input type="password" value="1234" id="password">
        <button class="session">Session login</button>
        <button class="jwt">JWT login</button>
        <button class="singup">회원가입</button>
      </form>
      <p> 유저 리스트: heo / kim / park</p>
      <p> 공통 비밀번호: 1234</p>
    </section>
  `;

  // document.querySelector('#root').innerHTML = template;

  // addAuthButtonEvent();
};

// function addAuthButtonEvent() {
//   const jwtButton = document.querySelector('.jwt');
//   const sessionButton = document.querySelector('.session');
//   const singUpButton = document.querySelector('.singup');

//   jwtButton.addEventListener('click', jwtLogin);
//   sessionButton.addEventListener('click', sessionLogin);
//   singUpButton.addEventListener('click', singUp);
// }

// async function singUp() {
//   const formData = getInputValue();

//   const result = await apiModel.signup(formData);

//   if (result.ok) {
//     alert('가입성공');
//   } else {
//     alert('가입실패');
//   }
// }

// async function jwtLogin(e) {
//   try {
//     const formData = getInputValue();
//     const result = await apiModel.loginJWT(formData);

//     document.cookie = `jwt=${result.token}`;

//     window.location.reload();
//   } catch (err) {
//     alert('로그인 실패');
//   }
// }

// async function sessionLogin(e) {
//   const formData = getInputValue();

//   await apiModel.loginSession(formData);

//   window.location.reload();
// }

// function getInputValue() {
//   const id = document.querySelector('#id').value;
//   const password = document.querySelector('#password').value;

//   return {
//     name: id,
//     password,
//   };
// }

export default {
  render,
};
