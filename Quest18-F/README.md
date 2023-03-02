# Quest 18-F. 프로그레시브 웹앱

## Introduction
* 이번 퀘스트에서는 2021년 현재 웹 프론트엔드의 많은 최신 기술 중 프로그레시브 웹앱에 관해 알아보겠습니다.

## Topics
* Progressive Web App(PWA)
* Service Worker
* Cache & CacheStorage API
* Web Manifest

## Resources
* [MDN - Progressive web apps (PWAs)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
* [MDN - Progressive web app Introduction](https://developer.mozilla.org/ko/docs/Web/Progressive_web_apps/Introduction)
* [MDN - Service Worker API](https://developer.mozilla.org/ko/docs/Web/API/Service_Worker_API)
* [web.dev - Progressive Web Apps](https://web.dev/progressive-web-apps/)

## Checklist
* 웹 어플리케이션을 프로그레시브 웹앱 형태로 만들면 어떤 이점을 가질까요?
  > - 앱 개발 생산성 증가
  >   - 웹 기술로 설치형 어플리케이션을 만들수 있습니다.
  >   - 앱스토어 및 플레이스토어의 심사와 리뷰 과정을 거치지 않아도 됩니다
  > - 기존 어플리케이션과 달리 검색 엔진을 통한 유입이 가능합니다.
  > - 서비스 워커를 활용하여 오프라인 및 저속도 네트워크 환경에서도 기능을 유지할 수 있습니다.
* 서비스 워커란 무엇인가요? 웹 워커와의 차이는 무엇인가요?
  > ### 서비스 워커
  > - 브라우저가 백그라운드에서 실행하는 웹페이지와는 별개로 작동하는 스크립트로, 오프라인 문제가 생겼을 경우 해결을 하기 위해 등장하였습니다.
  > - 서비스워커는 브라우저와 네트워크 사이에 프록시 서버 역할을 하며, 오프라인 환경의 캐시, 백그라운드 동기화, 푸시 알름 등의 기능을 사용할 수 있습니다.
  > <br>
  > ### 앱 워커
  > - 웹페이지 백그라운드에서 실행되는 자바스크립트 파일 입니다.
  > - 메인 스레드와 별로도 멀티 스레딩을 통하여 작업수행을 도와줍니다.
  > <br>
  > ### 차이점
  > - 서비스 워커는 네트워크 요청을 처리하고, 오프라인 기능을 제공하도록 설계됨.
  > - 웹 워커는 싱글 스레드인 자바스크립트의 단점을 보완하기 위해 나온 것으로 계산작업을 대신 수행시켜주는 별도의 스레드임.

* PWA의 성능을 높이기 위한 방법론에는 어떤 것들이 있고, 어떤 식으로 적용할 수 있을까요?
  > 1. 캐싱: 캐싱된 데이터는 오프라인에서도 사용이 가능하여서 빠른 로드가 가능합니다.
  > 2. 코드 번들링 최적화: 웹팩 같은 번들링 도구를 이용하여 파일 크기를 줄입니다.
  > 3. 이미지 최적화: 사용되는 에셋들의 크기를 줄입니다.

## Quest
* 텍스트 에디터 프로그램을 PWA 형태로 만들어 보세요.
  * 필요한 에셋을 적절히 캐싱하되, 버전업이 되었을 때 캐싱을 해제할 수 있는 형태가 되어야 합니다.
  * 해당 PWA를 데스크탑에 인스톨 가능하도록 만들어 보세요.
  * 오프라인인 경우에는 임시저장 기능을 만들어, 온라인인 경우를 감지하여 자동으로 서버에 반영되도록 만들어 보세요.

## Advanced
* 본 퀘스트의 주제로 고려되었으나 분량상 선정되지 않은 주제들은 다음과 같습니다. 시간날 때 한 번 찾아 보세요!
  * Search Engine Optimization(SEO)
  * CSS-in-JS와 Styled Component
  * Server-Side Rendering(SSR)
