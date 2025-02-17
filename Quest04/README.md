# Quest 04. OOP의 기본

## Introduction
* 이번 퀘스트에서는 바닐라 자바스크립트의 객체지향 프로그래밍에 대해 알아볼 예정입니다.

## Topics
* 객체지향 프로그래밍
  * 프로토타입 기반 객체지향 프로그래밍
  * 자바스크립트 클래스
    * 생성자
    * 멤버 함수
    * 멤버 변수
  * 정보의 은폐
  * 다형성
* 코드의 재사용

## Resources
* [MDN - Classes](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes)
* [MDN - Inheritance and the prototype chain](https://developer.mozilla.org/ko/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
* [MDN - Inheritance](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Objects/Inheritance)
* [Polymorphism](https://medium.com/@viktor.kukurba/object-oriented-programming-in-javascript-3-polymorphism-fb564c9f1ce8)
* [Class Composition](https://alligator.io/js/class-composition/)
* [Inheritance vs Composition](https://woowacourse.github.io/javable/post/2020-05-18-inheritance-vs-composition/)

## Checklist
* 객체지향 프로그래밍은 무엇일까요?
  > * 데이터를 추상화시켜 상태와 행위를 가진 객체를 만들고, 그 객체들 간의 유기적인 상호작용을 통해 로직을 구성하는 방법
  * `#`로 시작하는 프라이빗 필드는 왜 필요한 것일까요? 정보를 은폐(encapsulation)하면 어떤 장점이 있을까요?
    > * 외부에서 해당 데이터에 접근을 못하게 하여서, 데이터를 안전하게 다룰수있다는 점이 있습니다.
  * 다형성이란 무엇인가요? 다형성은 어떻게 코드 구조의 정리를 도와주나요?
    > * 다형성이란 같은 모양의 코드가 다른행위를 하는 것을 나타냅니다. (오버로딩, 오버라이딩)
    > * 오버로딩: 자바스크립트엔 없는 개념으로 같은이름의 함수가 매개변수의 갯수에 따라서 다른동작을 하는형식
    > * 오버라이딩: 부모로 부터 받은 메소드의 내용을 변경하는 것
    > * 다형성을 통하여 코드의 양이 줄어들고, 코드 재사용성이 좋아집니다.
  * 상속이란 무엇인가요? 상속을 할 때의 장점과 단점은 무엇인가요?
    > * 객체들 간의 관계를 구축하는 방법으로, 기존 클래스에 기능을 추가하거나 재정의하여 새로 클래스를 만드는형식
    > * 장점: 코드의 재사용성이 좋아짐, 다형성 구현
    > * 단점: 안보이는 코드(상속 받은 클래스의 코드)에 대해서 추측을해야함, 캡슐화가 위반될수있고, 상속으로 인해 결합도가 높아지면서 설계가 유연하지 않게 될 수 있습니다.
  * OOP의 합성(Composition)이란 무엇인가요? 합성이 상속에 비해 가지는 장점은 무엇일까요?
    > * 합성은 기존클래스를 상속을 통하여 확장하는 대신, 필드로 클래스의 인스턴스를 가지고있는 방법입니다.
    > * 상속에 비해 결합도가 느슨해져서 설계가 유연해짐
* 자바스크립트의 클래스는 어떻게 정의할까요?
  * 프로토타입 기반의 객체지향 프로그래밍은 무엇일까요?
    > * 원형 객체로 새로운 객체를 생성하는 형식 / 기존의 객체를 복사하여 새로운 객체를 만듬
  * 자바스크립트의 클래스는 이전의 프로토타입 기반의 객체지향 구현과 어떤 관계를 가지고 있나요?
    > * 자바스크립트의 클래스는 ES6에서 나왔는데, 결국 프로토타입과 똑같이 작동하기때문에 문법적 설탕이 아닌가...

## Quest
* 웹 상에서 동작하는 간단한 바탕화면 시스템을 만들 예정입니다.
* 요구사항은 다음과 같습니다:
  * 아이콘은 폴더와 일반 아이콘, 두 가지의 종류가 있습니다.
  * 아이콘들을 드래그를 통해 움직일 수 있어야 합니다.
  * 폴더 아이콘은 더블클릭하면 해당 폴더가 창으로 열리며, 열린 폴더의 창 역시 드래그를 통해 움직일 수 있어야 합니다.
  * 바탕화면의 생성자를 통해 처음에 생겨날 아이콘과 폴더의 개수를 받을 수 있습니다.
  * 여러 개의 바탕화면을 각각 다른 DOM 엘리먼트에서 동시에 운영할 수 있습니다.
  * Drag & Drop API를 사용하지 말고, 실제 마우스 이벤트(mouseover, mousedown, mouseout 등)를 사용하여 구현해 보세요!

## Advanced
* 객체지향의 역사는 어떻게 될까요?
> 초기 프로그래밍은 절차적 프로그래밍이였는데, 금방 스파게티 코드가 되어버려서, 탄생하게 된 것이 구조적 프로그래밍이였고, 작은 문제를 해결할 수 있는 객체들을 조합하는 객체지향 프로그래밍이 등장하게 되었습니다.

> 1960년 최초의 객체 지향언어는 시뮬라67, 1980년대에 C++ 등장, 1990년대 중반 이후로 각광받고 있는 자바가 있습니다.

* Smalltalk, Java, Go, Kotlin 등의 언어들로 넘어오면서 객체지향 패러다임 측면에서 어떤 발전이 있었을까요?

> 제 생각인데 완벽한 객체지향을 추구하는 것 대신 코드를 좀더 간편하게 작성할수 있는 방향으로 가는 것 같습니다. 그래서 객체지향도 지원을하면서 함수형도 가능케 하는 방향으로 변하는 것 같습니다. (다중 패러다임 언어)
> go는 클래스 대신 struct구조체 객체를 활용
