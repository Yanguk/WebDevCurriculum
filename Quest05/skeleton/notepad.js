class Notepad {
  /* TODO: 그 외에 또 어떤 클래스와 메소드가 정의되어야 할까요? */
  wrapperEl;

  constructor(wrapperEl) {
    this.wrapperEl = wrapperEl;
    this.template = `
<section class="explorer">
    <div class="explorer-header">
      <p>EXPLORER</p>
      <button class="new-file-button">새파일 추가</button>
    </div>
    <ol class="file-list">
    </ol>
</section>
<section class="main">
  <div class="tab-wrapper"></div>
  <div contenteditable="true" class="content-area">...</div>
</section>
    `;
  };

  init() {
    this.wrapperEl.insertAdjacentHTML('afterbegin', this.template);
  }
}

class LocalStorageModel {
  constructor() {}
}