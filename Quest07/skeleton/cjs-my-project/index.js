(async () => {

  const emsPackage = await import('../esm-package/index.mjs');
  const { CjsUtilClass, cjsUtilFunction } = require('../cjs-package/index.js');
  // TODO: cjs-package와 esm-package의 함수와 클래스들을 가져다 쓰고 활용하려면 어떻게 해야 할까요?
  // async로 감쌈
  // console.log(emsPackage);
  console.log(new CjsUtilClass(2).double());
  console.log(cjsUtilFunction("TEST"));
  console.log(emsPackage);
})();
