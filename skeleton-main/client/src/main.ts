import '@/style.css';
import loginPage from '@/views/LoginView';
import authApi from '@/api/auth.api';
import { Option } from 'uk-fp';
import Notepad2 from './views/Notepad';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then(() => console.log('서비스 워커 등록'))
      .catch((err) => console.log(err));
  });
}

async function main() {
  const root = Option.wrap(document.querySelector('#root')).unwrap();
  const result = await authApi.loginCheck();

  if (result.ok) {
    Notepad2.createRoot(root);
  } else {
    loginPage.render();
  }
}

main();
