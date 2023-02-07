# Quest 01. HTML과 웹의 기초

## Introduction
* HTML은 HyperText Markup Language의 약자로, 웹 브라우저에 내용을 표시하기 위한 가장 기본적인 언어입니다. 이번 퀘스트를 통해 HTML에 관한 기초적인 사항들을 알아볼 예정입니다.

## Topics
* HTML의 역사
  * HTML 4.01, XHTML 1.0, XHTML 1.1
  * XHTML 2.0과 HTML5의 대립
  * HTML5와 현재
* 브라우저의 역사
  * Mosaic와 Netscape
  * Internet Explorer의 독점시대
  * Firefox와 Chrome의 등장
  * iOS Safari와 모바일 환경의 브라우저
  * Edge와 Whale 등의 최근의 Chromium 계열 브라우저
* HTML 문서의 구조
  * `<html>`, `<head>`와 `<body>` 등의 HTML 문서의 기본 구조
  * 시맨틱 엘리먼트
  * 블록 엘리먼트와 인라인 엘리먼트의 차이

## Resources
* [MDN - HTML](https://developer.mozilla.org/ko/docs/Web/HTML)
* [HTML For Beginners](https://html.com/)
* [History of the web browser](https://en.wikipedia.org/wiki/History_of_the_web_browser)
* [History of HTML](https://en.wikipedia.org/wiki/HTML)
* [StatCounter](https://gs.statcounter.com/)

## Checklist
* HTML 표준의 역사는 어떻게 될까요?
  * HTML 표준을 지키는 것은 왜 중요할까요?
    > * 가장 중요한 이유는 웹 접근성이 향상되기 때문입니다.
    > * 올바른 태그를 사용하여 스크린리더기가 웹을 잘 읽을수 있도록함
    > * 표준이 있으면 유지 보수 및 개발이 용이함
  * XHTML 2.0은 왜 세상에 나오지 못하게 되었을까요?
    > * 문법이 엄격하여서 사용하기가 어려움
    > * 이전 버전과의 호환성을 지원하지 않음
  * HTML5 표준은 어떤 과정을 통해 정해질까요?
    > * World Wide Web Consortium(W3C)에서 정기적인 컨소시엄을 통해 표준이 정해지고 발표 됩니다.
* 브라우저의 역사는 어떻게 될까요?
  * Internet Explorer가 브라우저 시장을 독점하면서 어떤 문제가 일어났고, 이 문제는 어떻게 해결되었을까요?
    > * 독점이 일어나면서 브라우저의 기능 개선이 이뤄지지않았고, Active X라는 프로그램을 통해서 기능확장을 해야됬기때문에 호환성이 떨어지는 등의 문제들이 일어났습니다.
    > 해당 문제들은 크롬, 파이어폭스 등 새로운 브라우저들의 등장으로 해소 되었습니다.
  * 현재 시점에 브라우저별 점유율은 어떻게 될까요? 이 브라우저별 점유율을 알아보는 것은 왜 중요할까요?
    > * https://www.koreahtml5.kr/front/stats/browser/browserUseStats.do
    > * 2022년 11월 기준 / 크롬 71%, 엣지 16%, 웨일 5%, 사파리 3%
    > * 크로스 브라우징(어느 브라우저에서든 같은 화면을 보여줄수있는)에 대응하기 위하여 사용자의 환경을 파악하기위하여 점유율을 알아보는것이 중요합니다.
  * 브라우저 엔진(렌더링 엔진)이란 무엇일까요? 어떤 브라우저들이 어떤 엔진을 쓸까요?
    > * 렌더링 엔진은 요청된 컨텐츠를 브라우저화면에 표시하는 역할을 합니다
    > * Safari: Webkit
    > * Chrome, Opera, Edge: Blink (a fork of Webkit)
  * 모바일 시대 이후, 최근에 출시된 브라우저들은 어떤 특징을 가지고 있을까요?
    > * 모바일 기기의 블루투스 및 자이로센서 등을 이용할수 있도록 브리우저의 확장성을 넓히고 있습니다.
* HTML 문서는 어떤 구조로 이루어져 있나요?
  * `<head>`에 자주 들어가는 엘리먼트들은 어떤 것이 있고, 어떤 역할을 할까요?
    > * meta, link, title 태그들이 있습니다.
    > * meta: 인코딩방식 및 문서 설명
    > * link: 파비콘 및 css 불러오기
    > * title: 문서 제목 정하기
  * 시맨틱 태그는 무엇일까요?
    > * 의미를 잘 나타내는 태그 입니다.
    * 시맨틱 엘리먼트를 사용하면 어떤 점이 좋을까요?
      > * 웹 접근성이 좋아집니다.
    * `<section>`과 `<div>`, `<header>`, `<footer>`, `<article>` 엘리먼트의 차이점은 무엇인가요?
      > * header: 문서 내용의 머리글을 담당
      > * footer: 사이트 최하단에 있는 영역으로 저작권정보나, 정책 페이지 링크 등을 두곤합니다.
      > * div: 의미 론적 의미는 존재하지 않고 레이아웃을 나눌때 사용합니다.
      > * section: 관계가 있는 컨텐츠들을 그룹으로 묶어서 분리할때 사용함
      > * article: 독립적으로 존재가 가능한 내용의 요소를 표현할때 사용합니다.
  * 블록 레벨 엘리먼트와 인라인 엘리먼트는 어떤 차이가 있을까요?
    > * 인라인: 컨텐츠 크기만큼의 영역을 가지고있고 줄바꿈을 하지 않습니다. 예시로는 span태그
    > * 블록: 무조건 한줄단위의 크기를 가지고있고, 다음태그는 줄바꿈이 이뤄집니다. 예로는 div태그

## Quest
* [이 화면](screen.png)의 정보를 HTML 문서로 표현해 보세요. 다만 CSS를 전혀 사용하지 않고, 문서의 구조가 어떻게 되어 있는지를 파악하여 구현해 보세요.
  * [CSS Naked Day](https://css-naked-day.github.io/)는 매년 4월 9일에 CSS 없는 웹 페이지를 공개하여 내용과 마크업에 집중한 HTML 구조의 중요성을 강조하는 행사입니다.
* 폴더에 있는 `skeleton.html` 파일을 바탕으로 작업해 보시면 됩니다.
  * 화면을 구성하는 큰 요소들을 어떻게 처리하면 좋을까요?
  * HTML 문서상에서 같은 층위에 비슷한 요소들이 반복될 때는 어떤 식으로 처리하는 것이 좋을까요?

## Advanced
* XML은 어떤 표준일까요? 어떤 식으로 발전해 왔을까요?
> * XML은 데이터를 저장하고 전달할 목적으로 만들어졌으며, 저장되는 데이터의 구조를 기술하기 위한 언어입니다.
> * html을 개선하여 만들어짐
> * W3C의 표준

* YML, Markdown 등 다른 마크업 언어들은 어떤 특징을 가지고 있고, 어떤 용도로 쓰일까요?

> * yml, yaml 은 json의 불편함을 해소하기위해 나온 json의 슈퍼셋 입니다. 그리고 xml, json과 마찬가지로 데이터를 저장하고 전달하는 목적으로 만들어졌습니다.
>
> * markdown은 빠르고 쉽게 쓰고 읽을수있으며 html로도 변환가능한 특징이 있습니다.
