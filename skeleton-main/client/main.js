import './style.css';
import Notepad from './src/pages/Notepad';
import loginPage from './src/pages/LoginPage';
import authApi from './src/api/auth.api';

async function main() {
  const result = await authApi.loginCheck();

  if (result.ok) {
    const editorTemplate = "<div class='editor-wrapper'></div>";
    document.body.innerHTML = editorTemplate;
    const editorWrapper = document.querySelector('.editor-wrapper');

    const notepad = new Notepad(editorWrapper);
    notepad.init();
  } else {
    loginPage.render();
  }
}

main();
