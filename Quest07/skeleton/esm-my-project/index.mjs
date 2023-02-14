// TODO: cjs-package와 esm-package의 함수와 클래스들을 가져다 쓰고 활용하려면 어떻게 해야 할까요?
// cjs도 적용가능
import emsPackage from '../esm-package/index.mjs';
import { CjsUtilClass, cjsUtilFunction }  from '../cjs-package/index.js';

console.log(emsPackage);
console.log(new CjsUtilClass(2).double());
console.log(cjsUtilFunction("TEST"));
