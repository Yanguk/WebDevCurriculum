# Quest 09. 서버와 클라이언트의 대화

## Introduction
* 이번 퀘스트에서는 서버와 클라이언트의 연동, 그리고 웹 API의 설계 방법론 중 하나인 REST에 대해 알아보겠습니다.

## Topics
* expressJS, fastify
* AJAX, `XMLHttpRequest`, `fetch()`
* REST, CRUD
* CORS

## Resources
* [Express Framework](http://expressjs.com/)
* [Fastify Framework](https://www.fastify.io/)
* [MDN - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
* [MDN - XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
* [REST API Tutorial](https://restfulapi.net/)
* [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete)
* [MDN - CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

## Checklist
* 비동기 프로그래밍이란 무엇인가요?
  * 콜백을 통해 비동기적 작업을 할 때의 불편한 점은 무엇인가요? 콜백지옥이란 무엇인가요?
    > *  비동기 값을 받아올때 콜백함수를 인자로 넣어서 값을 받아오는 방식인데 겹쳐서 사용하다보면 코드의 들여쓰기가 감당하기 힘들정도로 깊어지는 현상이 나타나게 되는데 이를 콜백지옥이라고하고, 코드의 가독성이 떨어지고, 유지보수가 힘들어집니다.
  * 자바스크립트의 Promise는 어떤 객체이고 어떤 일을 하나요?
    > * 3가지의 상태를 가진 객체로써, 비동기 연산이 종료된 이후 값에 따른 처리를 메서드를 통해서 받을수있는 객체입니다.
    > * 3가지 상태
    >   * 대기(pending): 이행하지도, 거부하지도 않은 초기상태.
    >   * 이행(fulfilled): 연산이 성공적으로 완료되었으며 `then` 메소드 체인으로 값이 넘어가게 됩니다.
    >   * 거부(rejected): 연산이 실패했음을 의미하며, `catch` 메소드로 에러객체가 넘어가게 됩니다.
  * 자바스크립트의 `async`와 `await` 키워드는 어떤 역할을 하며 그 정체는 무엇일까요?
    > * promise 연산을 동기적으로 직관적이게 흘려가게 보이게끔 해주는 역할을 하는 문법적설탕이라고 할수 있습니다.
    > * async함수 안에서 await 키워드를 통하여 promise값을 받아올수가 있습니다.
    > * await키워드는 무조건 resolve가 된 값만 받아올수있기때문에 async-await 구문안에서는 예외 처리를 할때 try-catch를 같이 사용합니다.
* 브라우저 내 스크립트에서 외부 리소스를 가져오려면 어떻게 해야 할까요?
  > * AJAX(Asynchronous Javascript and Xml)를 사용합니다. (자바스크립트를 통해서 서버간에 XML 데이터를 주고받는 기술)
  * 브라우저의 `XMLHttpRequest` 객체는 무엇이고 어떻게 동작하나요?
    > * fetch가 나오기 이전에 ajax요청을 할때 사용되었습니다.
    > * 현재의 promise기반과는 달리 이벤트기반의 형식임
  * `fetch` API는 무엇이고 어떻게 동작하나요?
    > * 위의 XHR을 대체하며 비동기 요청을 좀더 쓰기 편하게해줌.
    > * Promise 기반으로 동작하며, 응답결과는 Response 객체
* REST는 무엇인가요?
  > * 분산 시스템 설계를 위한 아키텍쳐 스타일
  > * 자원의 형태는 url로 표현하고 행위에 대한것은 HTTP 메소드로 표현
  * REST API는 어떤 목적을 달성하기 위해 나왔고 어떤 장점을 가지고 있나요?
    > * ### 목적함
    >   1. 분산 시스템을 위함: 기능, 모듈별로 분리하기 위함
    >   2. web브라우저 외의 클라이언트와도 용이하게 통신하기 위함
    > * ### 장점
    >   1. 서버와 클라이언틔 역할을 명확하게 분리한다.
    >   2. rest api 메세지가 의도한바를 명확하게 나타내므로 의도를 쉽게 파악할수 있습니다.
    >   3. HTTP 프로토콜의 인프라를 그대로 사용하므로 별도의 인프라를 구축할 필요가 없습니다.

  * RESTful한 API 설계의 단점은 무엇인가요?
      > * ### 단점
      >   1. HTTP 메소드 형태가 제한적입니다.
      >   2. 표준규약이 존재하지 않아서 안티패턴으로 설계될 가능성이 있음
      >   3. 오버패칭: endpoint마다 응답값이 정해져있어서, 불필요한 데이터도 함께 넘어오게 됨으로써 리소스 낭비가 됩니다.
      >   4. 언더패칭: 필요한 데이터를 모두 불러오기위하여 여러개의 api를 요청해야된다는 것을 의미합니다.
* CORS란 무엇인가요? 이러한 기능이 왜 필요할까요? CORS는 어떻게 구현될까요?
  > * cross origin resource의 약자로 출처가 다른 자원들을 공유하기 위한 정책입니다.
  > * 브라우저는 요청을 날리기전에 preflight를 날려서 응답을 확인하게 되는데, 이에 따른 서버의 응답에서 헤더에 Access-control-allow-origin을 해당 클라이언트 도메인을 명시해주고, 허용가능한 http 메소드도 명시해줘야 합니다. (Access-control-allow-methods)

## Quest
* 이번 퀘스트는 Midterm에 해당하는 과제입니다. 분량이 제법 많으니 한 번 기능별로 세부 일정을 정해 보고, 과제 완수 후에 그 일정이 얼마나 지켜졌는지 스스로 한 번 돌아보세요.
  * 이번 퀘스트부터는 skeleton을 제공하지 않습니다!
* Quest 05에서 만든 메모장 시스템을 서버와 연동하는 어플리케이션으로 만들어 보겠습니다.
  * 클라이언트는 `fetch` API를 통해 서버와 통신합니다.
  * 서버는 8000번 포트에 REST API를 엔드포인트로 제공하여, 클라이언트의 요청에 응답합니다.
  * 클라이언트로부터 온 새 파일 저장, 삭제, 다른 이름으로 저장 등의 요청을 받아 서버의 로컬 파일시스템을 통해 저장되어야 합니다.
    * 서버에 어떤 식으로 저장하는 것이 좋을까요?
  * API 서버 외에, 클라이언트를 띄우기 위한 서버가 3000번 포트로 따로 떠서 API 서버와 서로 통신할 수 있어야 합니다.
  * Express나 Fastify 등의 프레임워크를 사용해도 무방합니다.
* 클라이언트 프로젝트와 서버 프로젝트 모두 `npm i`만으로 디펜던시를 설치하고 바로 실행될 수 있게 제출되어야 합니다.
* 이번 퀘스트부터는 앞의 퀘스트의 결과물에 의존적인 경우가 많습니다. 제출 폴더를 직접 만들어 제출해 보세요!

## Advanced
* `fetch` API는 구현할 수 없지만 `XMLHttpRequest`로는 구현할 수 있는 기능이 있을까요?
* REST 이전에는 HTTP API에 어떤 패러다임들이 있었을까요? REST의 대안으로는 어떤 것들이 제시되고 있을까요?
  > ### SOAP
  >   * 그 자체로 프로토콜이며, 표준들이 정해져있기때문에 복잡합니다. 그리고 rest비해 무겁고 느립니다.
  >   * XML을 사용해 메세지를 인코딩하고 HTTP를 사용해 전송하는 방식입니다.
  > ### Graphql: 현재 rest api의 대안으로 볼수있음.
  >   * rest api의 단점인 오버패칭와 언더패칭을 해결할 수 있습니다. (하나의 endpoint에 쿼리문으로 원하는 데이터만 가져올수 있음)
  >   * 단점
  >     * 캐싱이 rest보다 복잡
  >     * 파일 업로드 구현방법이 정해져있지 않음
  >     * 고정된 요청과 응답만 필요할 경우 요청의 크기가 rest보다 커질수가 있음
  > * rest가 가지는 한계 때문에 등장 하였지만 rest를 대체 할 수는 없음.
