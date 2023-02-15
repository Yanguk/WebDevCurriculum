import './style.css';
import Notepad from './src/notepad';

const editorWrapper = document.querySelector('.editor-wrapper');
const notepad = new Notepad(editorWrapper);

notepad.init();
