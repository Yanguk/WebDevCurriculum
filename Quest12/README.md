# Quest 12. 보안의 기초

## Introduction
* 이번 퀘스트에서는 가장 기초적인 웹 서비스 보안에 대해 알아보겠습니다.

## Topics
* XSS, CSRF, SQL Injection
* HTTPS, TLS

## Resources
* [The Basics of Web Application Security](https://martinfowler.com/articles/web-security-basics.html)
* [Website Security 101](https://spyrestudios.com/web-security-101/)
* [Web Security Fundamentals](https://www.shopify.com.ng/partners/blog/web-security-2018)
* [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
* [Wikipedia - TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security)

## Checklist
* 입력 데이터의 Validation을 웹 프론트엔드에서 했더라도 서버에서 또 해야 할까요? 그 이유는 무엇일까요?
  * 서버로부터 받은 HTML 내용을 그대로 검증 없이 프론트엔드에 innerHTML 등을 통해 적용하면 어떤 문제점이 있을까요?
  >innerHTML 안에 있는 악성 자바스크립트가 실행될 수 있습니다.
  >```js
  >const name = "<img src='x' onerror='alert(1)'>";
  >el.innerHTML = name; // shows the alert
  >```
  >일반 텍스트를 삽입 할 때는 Node.textContent를 사용하는 것이 좋습니다.
  >
  * XSS(Cross-site scripting)이란 어떤 공격기법일까요?
  > * 권한이 없는 사용자가 악의적인 용도로 웹 사이트에 스크립트를 삽입하는 공격 기법
  > * 사이트 간 스크립팅, 크로스 사이트 스크립팅(Cross-site scripting)은 웹사이트 관리자가 아닌 이가 웹 페이지에 악성 스크립트를 삽입/실행 할 수 있는 취약점입니다. 비지속적 기법과 지속적 기법이 존재합니다.
  * CSRF(Cross-site request forgery)이란 어떤 공격기법일까요?
  > CSRF 공격(Cross Site Request Forgery)은 웹 어플리케이션 취약점 중 하나로 인터넷 사용자(희생자)가 자신의 의지와는 무관하게 공격자가 의도한 행위(수정, 삭제, 등록 등)를 특정 웹사이트에 요청하게 만드는 공격입니다.
  > # 보완
  > * 공격이 이뤄지는 조건
  >   * 위조 요청을 전송하는 서비스에 희생자가 로그인 상태
  >   * 희생자가 해커가 만든 피싱 사이트에 접속
  * SQL Injection이란 어떤 공격기법일까요?
  > * 응용 프로그램의 보안 상 허점을 이용해 악의적인 SQL문이 실행되도록 하는 공격 방법입니다.
  > # 보완
  > ```js
  > 학생이름 = "Robert'); DROP TABLE students; --";
  > ```
  >
  > ```sql
  > INSERT INTO students (이름) VALUES ('학생이름');
  >```
* 대부분의 최신 브라우저에서는 HTTP 대신 HTTPS가 권장됩니다. 이유가 무엇일까요?
  > # 보완
  > 공개키암호화 방식으로 **패킷**을 암호화하여 주고받을수 있기때문에
  * HTTPS와 TLS는 어떤 식으로 동작하나요? HTTPS는 어떤 역사를 가지고 있나요?
  > * 동작방식
  >   * 응용계층과 전송계층 사이에 독립적인 프로토콜 계층을 만들어서 동작하며, 응용계층은 데이터를 TLS에 보내고,
  >   * TLS은 받은 데이터를 공개키암호화 방식으로 암호화하여 TCP한테 보낸뒤, TCP를 통해 데이터가 전송됨.
  > * 데이터 암호화 방식
  >   * 클라이언트는 공개키로 암호화하여 서버에 보냄.
  >   * 서버는 개인키로 복호화하여 데이터를 받음.
  >   * 중간에 공개키가 탈취당해도, 서버의 개인키로만 복호화가 가능하므로 데이터가 안전함.
  > * 역사
  >   1. 최조 제안: 1994년 넷케이프사 SSL
  >   2. 1999년 표준화된것이 SSL v3.0을 참고로하여 TLS이 됨.
  >   * 따라서 SSL과 TLS는 버전의 차이가 있음
  * HTTPS의 서비스 과정에서 인증서는 어떤 역할을 할까요? 인증서는 어떤 체계로 되어 있을까요?
  > # 보완
  > * TLS 통신에 사용할 공개키를 클라이언트에게 제공한다.
  > * 클라이언트가 접속하려는 서버가 신뢰 할 수 있는 서버인지 확인가능

  > 인증서의 내용은 CA의 비공개 키를 이용해서 암호화 되어 웹브라우저에게 제공된다.
  > * 서비스 정보 (인증서 발급자, CA의 디지털 서명,서비스 도메인)
  > * 서버측 공개키

## Quest
* 메모장의 서버와 클라이언트에 대해, 로컬에서 발행한 인증서를 통해 HTTPS 서비스를 해 보세요.
  > * 로컬에서 인증기관을 대신하여 인증서를 검증해주는 역할인 mkcert를 활용하여 로컬에서 https 서비스를 수행함

## Advanced
* TLS의 인증서에 쓰이는 암호화 알고리즘은 어떤 종류가 있을까요?
  > openssl는 AES256 라는 알고리즘으로 대칭키 암호화방식 으로 CA key를 생성한다고 합니다.
* HTTP/3은 기존 버전과 어떻게 다를까요? HTTP의 버전 3이 나오게 된 이유는 무엇일까요?
  > * 기존 버전과 다르게 UDP 프로토콜을 사용함.
  > * 나오게 된 과정은 기존의 http를 개선시키는 방향에서 tcp 프로토콜은 신뢰성이 확보되지만 지연을 줄이기 힘든구조여서, UDP 프로토콜로 지연을 줄이면서 신뢰성을 확보하는 방법으로 진행되서 나왔습니다.
