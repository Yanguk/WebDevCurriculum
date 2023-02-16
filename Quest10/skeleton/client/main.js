import './style.css';
import Notepad from './src/notepad';
import loginPage from './src/pages/LoginPage';
import apiModel from './src/models/apiModel';

async function main() {
  if (await apiModel.loginCheck()) {
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
