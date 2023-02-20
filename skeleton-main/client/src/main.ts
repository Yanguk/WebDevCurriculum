import '@/style.css';
import Notepad from '@/pages/Notepad';
import loginPage from '@/pages/LoginPage';
import authApi from '@/api/auth.api';

async function main() {
  const root = document.querySelector('#root');
  const result = await authApi.loginCheck();

  if (result.ok) {
    const editorTemplate = "<div class='editor-wrapper'></div>";
    root.innerHTML = editorTemplate;

    const editorWrapper = document.querySelector('.editor-wrapper');
    const notepad = new Notepad(editorWrapper);

    notepad.init();
  } else {
    loginPage.render();
  }
}

main();
