let globalId = 1;

class Notepad {
  /* TODO: 그 외에 또 어떤 클래스와 메소드가 정의되어야 할까요? */
  wrapperEl;
  #fileList;
  #tapList;
  #LocalStorageModel;

  constructor(wrapperEl) {
    this.#LocalStorageModel = new LocalStorageModel();
    this.#fileList = [];
    this.#tapList = [];
    this.wrapperEl = wrapperEl;
    this.template = `
<section class="explorer">
    <div class="explorer-header">
      <p>EXPLORER</p>
      <button class="new-file-button">새파일 추가</button>
    </div>
    <ul class="file-list"></ul>
</section>
<section class="main">
  <ul class="tab-wrapper"></ul>
  <div contenteditable=false class="content-area"></div>
</section>
    `;
  }

  init() {
    this.wrapperEl.insertAdjacentHTML('afterbegin', this.template);
    this.#fileListRender();
    this.#addNewFileButtonEvent();
  }

  #addNewFileButtonEvent() {
    const newFileButton = this.wrapperEl.querySelector('.new-file-button');

    newFileButton.addEventListener('click', (e) => {
      const fileCount = this.#fileList.length;

      this.#fileList.push(
        new File({ name: `파일${fileCount + 1}`, notepad: this, content: '' })
      );
      this.#fileListRender();
    });
  }

  #fileListRender() {
    const fileListEl = this.wrapperEl.querySelector('.file-list');

    const makeTemplate = (file) => `
      <li class="file">
        <img><p>${file.name}</p>
      </li>
    `;

    const fileListTemplate = this.#fileList.reduce(
      (acc, file) => acc + makeTemplate(file),
      ''
    );

    fileListEl.innerHTML = fileListTemplate;

    const files = fileListEl.querySelectorAll('.file');

    files.forEach((node, idx) => {
      node.addEventListener('click', (e) => {
        this.#fileList[idx].show();
      });
    });
  }

  activeTab(tab) {
    if (!this.#isExitedTab(tab)) {
      this.#tapList.push(tab);
    }

    const tabWrapper = this.wrapperEl.querySelector('.tab-wrapper');
    const makeTabTemplate = (tab) => `
      <li class="tab file${tab.id}">
        <span class="name">${tab.name}</span>
      </li>
    `;

    const template = this.#tapList.reduce((acc, cur) => {
      return acc += makeTabTemplate(cur);
    }, '');

    tabWrapper.innerHTML = template;
    this.#selectTab(tab);

    this.#addTabClickEvent();
  }

  #addTabClickEvent() {
    const tabWrapper = this.wrapperEl.querySelector('.tab-wrapper');
    const tabEls = tabWrapper.querySelectorAll('.tab');

    tabEls.forEach((node, idx) => {
      node.addEventListener('click', (e) => {
        const selectedTab = tabWrapper.querySelector('.selected');

        if (selectedTab === node) {
          return;
        }

        const tabEl = this.#tapList[idx];

        this.activeTab(tabEl);
        tabEl.show();
      });
    });
  }

  #selectTab(tab) {
    const tabWrapper = this.wrapperEl.querySelector('.tab-wrapper');
    const preSelectTab =  tabWrapper.querySelector('.selected');
    preSelectTab?.classList.delete('selected');

    const target = tabWrapper.querySelector(`.file${tab.id}`);
    target.classList.add('selected');
  }

  #isExitedTab(tab) {
    return !!this.wrapperEl.querySelector(`.file${tab.id}`);
  }
}

class LocalStorageModel {
  constructor() {}
}

class File {
  constructor({ name, notepad, content = '' }) {
    this.id = globalId++;
    this.notepad = notepad;
    this.name = name;
    this.content = content;
  }

  active() {
    
  }

  show() {
    const contentArea = this.notepad.wrapperEl.querySelector('.content-area');

    contentArea.textContent = this.content;
    contentArea.setAttribute('contenteditable', true);
    this.notepad.activeTab(this);
  }
}
