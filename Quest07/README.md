# Quest 07. node.js의 기초

## Introduction

- 이번 퀘스트에서는 node.js의 기본적인 구조와 개념에 대해 알아 보겠습니다.

## Topics

- node.js
- npm
- CommonJS와 ES Modules

## Resources

- [About node.js](https://nodejs.org/ko/about/)
- [Node.js의 아키텍쳐](https://edu.goorm.io/learn/lecture/557/%ED%95%9C-%EB%88%88%EC%97%90-%EB%81%9D%EB%82%B4%EB%8A%94-node-js/lesson/174356/node-js%EC%9D%98-%EC%95%84%ED%82%A4%ED%85%8D%EC%B3%90)
- [npm](https://docs.npmjs.com/about-npm)
- [npm CLI commands](https://docs.npmjs.com/cli/v7/commands)
- [npm - package.json](https://docs.npmjs.com/cli/v7/configuring-npm/package-json)
- [How NodeJS Require works!](https://www.thirdrocktechkno.com/blog/how-nodejs-require-works)
- [MDN - JavaScript Modules](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Modules)
- [ES modules: A cartoon deep-dive](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)
- [require vs import](https://www.geeksforgeeks.org/difference-between-node-js-require-and-es6-import-and-export/)

## Checklist

- node.js는 무엇인가요? node.js의 내부는 어떻게 구성되어 있을까요?
  > - V8 자바스크립트 엔진과 파일시스템, C++, DNS, 네트워크, child processes, 신호 처리 등을 담당하는 libuv 등을 탑재한 자바스크립트 런타임입니다
  > - C++, V8, libuv라이브러리
- npm이 무엇인가요? `package.json` 파일은 어떤 필드들로 구성되어 있나요?
  > - npm은 node.js를 위한 패키지 매니저이자, node.js를 위한 오픈소스 생태계입니다. package.json은 만든 프로젝트가 의존하는 패키지의 목록(의존성 관리), 프로젝트의 버전, 라이센스 등을 명시한 문서입니다. 패키지에 대한 설명을 담은 description, 패키지의 진입점 모듈의 ID를 나타내는 main, 자주 사용하는 command의 단축 명령어를 등록하는 scripts, npm에서 검색될 때 나타내는 keywords, 저자를 나타내는 author, 배포할 패키지의 라이센스 정보를 담는license, 패키지의 의존성을 관리하는 dependencies와 devDependencies 등이 있습니다.
- npx는 어떤 명령인가요? npm 패키지를 `-g` 옵션을 통해 글로벌로 저장하는 것과 그렇지 않은 것은 어떻게 다른가요?
  > - npx는 설치 없이 패키지를 실행하는 명령어입니다. npm 패키지를 -g 옵션을 통해 글로벌로 저장하면 해당 패키지를 전역적으로 사용할 수 있으며, package.json 목록에 남지 않습니다.
- 자바스크립트 코드에서 다른 파일의 코드를 부르는 시도들은 지금까지 어떤 것이 있었을까요? CommonJS 대신 ES Modules가 등장한 이유는 무엇일까요?
  > - CommonJS에서는 require()와 module.exports를 사용하며, ESM은 import와 export를 사용합니다.
  > - 기존의 commonjs 모듈을 다 불러와야했지만 esm은 tree shaking을 통해 실제 사용되는 부분만 불러올수있게 바뀜.
- ES Modules는 기존의 `require()`와 동작상에 어떤 차이가 있을까요? CommonJS는 할 수 있으나 ES Modules가 할 수 없는 일에는 어떤 것이 있을까요?
  > - esm은 파일 맨처음에서만 import로 파일을 가져올수 있는 반면에 cjs에서는 어느 구간에서나 require()를 통해 동적으로 모듈을 가져올수가 있습니다.
- node.js에서 ES Modules를 사용하려면 어떻게 해야 할까요? ES Modules 기반의 코드에서 CommonJS 기반의 패키지를 불러오려면 어떻게 해야 할까요? 그 반대는 어떻게 될까요?
  > - es modules에서는 require도 지원해주기때문에 이용이 가능합니다.
  > - 반면에 cjs에서는 esm 파일을 불러올려면 async로 감싸서 await import로 가져올수가있습니다.

## Quest

- 스켈레톤 코드에는 다음과 같은 네 개의 패키지가 있으며, 용도는 다음과 같습니다:
  - `cjs-package`: CommonJS 기반의 패키지입니다. 다른 코드가 이 패키지의 함수와 내용을 참조하게 됩니다.
  - `esm-package`: ES Modules 기반의 패키지입니다. 다른 코드가 이 패키지의 함수와 내용을 참조하게 됩니다.
  - `cjs-my-project`: `cjs-package`와 `esm-package`에 모두 의존하는, CommonJS 기반의 프로젝트입니다.
  - `esm-my-project`: `cjs-package`와 `esm-package`에 모두 의존하는, ES Modules 기반의 프로젝트입니다.
- 각각의 패키지의 `package.json`과 `index.js` 또는 `index.mjs` 파일을 수정하여, 각각의 `*-my-project`들이 `*-package`에 노출된 함수와 클래스를 활용할 수 있도록 만들어 보세요.

## Advanced

- node.js 외의 자바스크립트 런타임에는 어떤 것이 있을까요?
  > deno, bunjs
