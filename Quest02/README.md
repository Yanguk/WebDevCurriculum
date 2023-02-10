# Quest 02. CSS의 기초와 응용

## Introduction
* CSS는 Cascading StyleSheet의 약자입니다. 웹브라우저에 표시되는 HTML 문서의 스타일을 지정하는 (거의) 유일하지만 다루기 쉽지 않은 언어입니다. 이번 퀘스트를 통해 CSS의 기초적인 레이아웃 작성법을 알아볼 예정입니다.

## Topics
* CSS의 기초 문법과 적용 방법
  * Inline, `<style>`, `<link rel="stylesheet" href="...">`
* CSS 규칙의 우선순위
* 박스 모델과 레이아웃 요소
  * 박스 모델: `width`, `height`, `margin`, `padding`, `border`, `box-sizing`
  * `position`, `left`, `top`, `display`
  * CSS Flexbox와 Grid
* CSS 표준의 역사
* 브라우저별 Developer tools

## Resources
* [MDN - CSS](https://developer.mozilla.org/ko/docs/Web/CSS)
* [Centering in CSS: A Complete Guide](https://css-tricks.com/centering-css-complete-guide/)
* [A complete guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
* [그리드 레이아웃과 다른 레이아웃 방법과의 관계](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Grid_Layout/%EA%B7%B8%EB%A6%AC%EB%93%9C_%EB%A0%88%EC%9D%B4%EC%95%84%EC%9B%83%EA%B3%BC_%EB%8B%A4%EB%A5%B8_%EB%A0%88%EC%9D%B4%EC%95%84%EC%9B%83_%EB%B0%A9%EB%B2%95%EA%B3%BC%EC%9D%98_%EA%B4%80%EA%B3%84)

## Checklist
* CSS를 HTML에 적용하는 세 가지 방법은 무엇일까요?
  * 세 가지 방법 각각의 장단점은 무엇일까요?
  > 1. **인라인**: 태그안에 style속성을 정의하여 스타일을 입힘
  > - 장점: 원하는 태그에만 스타일을 적용시킬수있다.
  > - 단점: 스타일속성이 많아질수록 유지보수하기가 어려워짐
  > 2. **내부**: head태그안에 style태그로 css를 적용
  > - 장점: 한 문서에만 해당되는 스타일을 지정해줄 수 있습니다.
  > - 단점: 문서마다 매 번 스타일을 지정해줘야함
  > 3. **외부**: link태그로 작성된 css파일을 불러오는 방식함
  > - 장점: 코드 재활용에 좋고, 일관된 웹페이지를 제작하기에 용이함
  > - 단점: css파일이 로드되기 전까지 페이지가 올바르게 표시되지 않습니다.
* CSS 규칙의 우선순위는 어떻게 결정될까요?
  > 1. 속성 값 뒤에 **!important** 가 있는 속성
  > 2. html에 **인라인태그**로 지정한 속성
  > 3. **#id** 로 지정한 속성
  > 4. **클래스** 및 추상클래스로 지정한 속성
  > 5. **태그이름**으로 지정한 속성
  > 6. 상위 객체에 의해 상속된 속성
* CSS의 박스모델은 무엇일까요? 박스가 화면에서 차지하는 크기는 어떻게 결정될까요?
  > * html 모든 요소는 박스모양으로 되어있으며, padding과 border, margin, content로 구성되어있고 이들의 크기만큼 박스의 크기가 정해집니다.
* `float` 속성은 왜 좋지 않을까요?
  > * 요소의 배치를 제어할 때 사용하는 속성이고, 자식요소에서 사용할 경우 부모가 자식요소의 높이를 인식하지 못하는 문제가 발생하기 때문입니다.
* Flexbox(Flexible box)와 CSS Grid의 차이와 장단점은 무엇일까요?
  > * flex는 1차원 레이아웃 이고, grid는 수직 수평 둘다 가능한 2차원 레이아웃 입니다.
* CSS의 비슷한 요소들을 어떤 식으로 정리할 수 있을까요?
  > * 비슷한 요소들끼리 묶어서 class나 id로 그룹지어서 정리할 수 있지 않을까요?

## Quest
* Quest 01에서 만들었던 HTML을 바탕으로, [이 그림](screen.png)의 레이아웃과 CSS를 최대한 비슷하게 흉내내 보세요. 꼭 완벽히 정확할 필요는 없으나 align 등의 속성은 일치해야 합니다.
* **주의사항: 되도록이면 원래 페이지의 CSS를 참고하지 말고 아무것도 없는 백지에서 시작해 보도록 노력해 보세요!**

## Advanced
* 왜 CSS는 어려울까요?
  > * css의 상호작용을 모두 알기가 어려움 (example: border 속성이 width와 height에 미치는 영향)
  > * 글로벌스코프를 가지고있어서 어떤게 최종적으로 적용될지 예측하기가 어려움
  > * 브라우저 환경에 따라 css로 보여지는 모습이 다름
* CSS의 어려움을 극복하기 위해 어떤 방법들이 제시되고 나왔을까요?
  > 1. 글로벌스코프를 극복하기 위하여 css moudles가 나오게 됨. 원하는 컴포넌트에만 적용될수있도록함
  > 2. css의 문제점을 프로그래밍 개념을 도입하여 보완한 전처리기가 나옴 (Sass, Less, Stylus)
  > 3. css in js 의 등장 2014년 페이스북 개발자인 Christopher Chedeau aka Vjeux가 처음 소개함
  > - css in js 의 등장으로 글로벌 스코프문제를 해결할수있고, element와 css의 의존관계를 명확하게 할수가 있습니다.
* CSS가 브라우저에 의해 해석되고 적용되기까지 내부적으로 어떤 과정을 거칠까요?
  > 1. 렌더링엔진이 html을 파싱하면서 dom을 생성하게되는데 파싱중에 link태그나 style태그를 만나게되면 dom생성을 잠시 중단하고 css를 파싱하면서 CSSOM을 구축하게 됩니다. 그리고 html파싱을 이어나가면서 dom을 구축하게 됩니다.
  > 2. 생성된 DOM 트리와 CSSOM트리를 결합하여 렌더트리를 형성합니다.
  > 3. 레이아웃 작업을 통해 돔의 위치와 크기를 계산해서 배치합니다.
  > 4. 페인팅 작업을 통해 픽셀값을 채워넣으면서 css 적용됩니다.
* 웹 폰트의 경우에는 브라우저 엔진 별로 어떤 과정을 통해 렌더링 될까요?
  > * 익스플로어: FOIT (Flash of Invisible Text) 방식으로 웹폰트가 로드된 후에 텍스트를 보여줌
  > * 그외 브라우저: FOUT (Flash of Unstyled Text) 방식으로 로드 되기전에는 시스템의 기본 폰트로 보여주고 이후 로드되면 reflow 해서 글꼴을 대체하는 방식 입니다.
