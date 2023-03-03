import '@/style.css';
import loginPage from '@/views/LoginView';

import authApi from '@/api/auth.api';
import { Option } from 'uk-fp';
import Notepad from '@/views/Notepad';
import '@/lib/registerWorker';

async function main() {
  const root = Option.wrap(document.querySelector('#root')).unwrap();
  const result = await authApi.loginCheck();

  if (result.ok) {
    Notepad.createRoot(root);
  } else {
    loginPage.render();
  }
}

main();
