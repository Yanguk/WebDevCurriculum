import apiModel from "../models/apiModel";

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
      </form>
      <p> 유저 리스트: heo / kim / park</p>
      <p> 공통 비밀번호: 1234</p>
    </section>
  `;

  document.body.innerHTML = template;

  const jwtButton = document.querySelector('.jwt');
  const sessionButton = document.querySelector('.session');

  jwtButton.addEventListener('click', jwtLogin);
  sessionButton.addEventListener('click', sessionLogin);
};

async function jwtLogin(e) {
  const formData = getInputValue();

  await apiModel.loginJWT(formData);

  window.location.reload();
}

async function sessionLogin(e) {
  const formData = getInputValue();

  await apiModel.loginSession(formData);

  window.location.reload();
}

function getInputValue() {
  const id = document.querySelector('#id').value;
  const password = document.querySelector('#password').value;

  return {
    id,
    password,
  };
}

export default {
  render,
};
