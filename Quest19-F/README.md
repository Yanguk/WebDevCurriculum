# Quest 19-F. 웹 어셈블리의 기초

## Introduction

- 이번 퀘스트에서는 2021년 현재 웹 프론트엔드의 많은 최신 기술 중 웹 어셈블리에 관해 알아보겠습니다.

## Topics

- Web Assembly
- Rust

## Resources

- [MDN - 웹어셈블리의 컨셉](https://developer.mozilla.org/ko/docs/WebAssembly/Concepts)
- [MDN - Rust to wasm](https://developer.mozilla.org/ko/docs/WebAssembly/Rust_to_wasm)
- [Learn Rust](https://www.rust-lang.org/learn)
- [Rust - sha2](https://docs.rs/sha2/0.9.5/sha2/)

## Checklist

- 웹 어셈블리란 어떤 기술인가요?
  > - 웹 브라우저에서 실행되는 새로운 종류의 가상 머신 기술
  > - C/C++, rust 같은 저수준 언어로 작성된 코드를 웹에서 직접 실행할 수 있도록 하는 기술입니다.
- 웹 어셈블리 모듈을 웹 프론트엔드 상에서 실행시키려면 어떻게 해야 할까요?
  > #### 스트리밍 하기
  > ```js
  >const importObject = {
  >   imports: { imported_func: arg => console.log(arg) }
  >};
  >
  > WebAssembly.instantiateStreaming(
  >   fetch('simple.wasm'), importObject,
  > ).then(obj => obj.instance.exports.exported_func());
  > ```
  > #### 스트리밍 하지 않기
  > ```js
  > fetch('module.wasm')
  >   .then(response => response.arrayBuffer())
  >   .then(bytes => WebAssembly.instantiate(bytes))
  >   .then(obj => {
  >     const result = obj.instance.exports.myFunction(123);
  >     console.log(result);
  >   });
  > ```
  > [MDN-WebAssembly](https://developer.mozilla.org/ko/docs/WebAssembly/Using_the_JavaScript_API)
- Rust란 어떤 특징을 가진 프로그래밍 언어인가요?
  > - 높은 안전성
  >   - 컴파일러가 메모리 사용에 대한 문제를 체크해줌
  > - 빠른 속도
  >   - C와 C++과 비슷한 수준의 성능을 발휘함
  > - 표현력
  >   - 클로저, 매칭, 패턴 매칭 등을 제공해줍니다.
  > - Zero-cost Abstraction
  >   - 추상적으로 코드를 작성해도 가장 low-level로 실행함.
  > - 다중패러다임 언어
- 웹 어셈블리 모듈을 만드는 방법에는 어떤 것들이 있나요?
  > - 기존의 C/C++, rust, go 등등 언어를 사용하여 작성된 코드를 웹 어셈블리 모듈로 변환하는 도구나 툴체인등을 사용하여서 웹 어셈블리 모듈로 변환하면 됩니다.
  > - rust의 경우에는 cargo 패키지에 있는 wasm-pack가 있습니다.
  > - 타입스크립트와 비슷한 문법의 Assembly-script언어를 사용하여 만들수도 있습니다.
- 웹 어셈블리가 할 수 없는 작업에는 무엇이 있을까요? 웹 어셈블리는 어떤 목적에 주로 쓰이게 될까요?
  > #### 할 수 없는 작업
  > - DOM에 직접 접근 할수 없습니다.
  > - 웹 브라우저와 상호 작용하는데 있어서 제한이 있습니다.
  >   - 브라우저 쿠키,로컬 스토리 등에 직접 접근 불가능함.
  > #### 주로 쓰이는 목적
  > - 자바스크립트에서는 수행하기 어려운 고성능 계산을 수행하는데 있어서 웹 어셈블리를 같이 사용하여서 최적화된 어플리케이션을 구현할 수 있습니다. (게임엔진, 웹 오디오 믹싱, 비트맵 이미지 처리 등등...)

## Quest

- 텍스트 에디터 프로그램에서 각 탭의 내용의 SHA-256 해시를 실시간으로 계산하여 화면 아래에 표시해 보세요.
  - 해당 해시는 Rust로 작성된 웹 어셈블리 함수를 통해 계산되어야 합니다.
  - 순수 자바스크립트로 계산할 때와의 퍼포먼스 차이를 체크해 보세요. (퍼포먼스 차이를 알아보는 데에 어떤 전략들이 있을까요?)

## Advanced

- 웹 어셈블리 바이너리는 어떻게 구성되어 있을까요?
