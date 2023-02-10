let globalId = 1;

class Notepad {
  /* TODO: 그 외에 또 어떤 클래스와 메소드가 정의되어야 할까요? */
  wrapperEl;
  #fileList;
  #tapList;
  store;

  constructor(wrapperEl) {
    this.#fileList = [];
    this.#tapList = [];
    this.wrapperEl = wrapperEl;
    this.store = new Store();
    this.template = `
<section class="explorer">
    <div class="explorer-header">
      <p>EXPLORER</p>
      <div class="button-wrapper">
        <button class="new-file-button">새파일 추가</button>
        <button class="save-button">저장하기</button>
      </div>
    </div>
    <ul class="file-list"></ul>
</section>
<section class="main">
  <ul class="tab-wrapper"></ul>
  <div contenteditable=false class="content-area"></div>
</section>
    `;

    this.store.fileNames.forEach((name) => {
      const target = this.store.files[name];

      this.#fileList.push(new File({
        name: target.name,
        content: target.content,
        notepad: this,
      }));
    });
  }

  init() {
    this.wrapperEl.insertAdjacentHTML('afterbegin', this.template);
    this.#fileListRender();
    this.#addNewFileButtonEvent();
    this.#addSaveButtonEvent();
  }

  #addSaveButtonEvent() {
    this.wrapperEl
      .querySelector('.save-button')
      .addEventListener('click', () => {
        const selectFileEl = this.wrapperEl.querySelector('.selected');

        if (!selectFileEl) {
          return;
        }

        const targetId = selectFileEl.id;
        const targetFile = this.#fileList.filter(
          (file) => file.id === Number(targetId.slice(4))
        )[0];

        targetFile.save();
      });
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
      <li class="tab" id="file${tab.id}">
        <span class="name">${tab.name}</span>
      </li>
    `;

    const template = this.#tapList.reduce((acc, cur) => {
      return (acc += makeTabTemplate(cur));
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
    const preSelectTab = tabWrapper.querySelector('.selected');
    preSelectTab?.classList.delete('selected');

    const target = tabWrapper.querySelector(`#file${tab.id}`);
    target.classList.add('selected');
  }

  #isExitedTab(tab) {
    return !!this.wrapperEl.querySelector(`#file${tab.id}`);
  }

  getMainContent() {
    return this.wrapperEl.querySelector('.content-area').textContent;
  }
}

class LocalStorageModel {
  #key;
  #store;

  constructor() {
    this.#key = 'list';
    this.#store = JSON.parse(window.localStorage.getItem(this.#key)) || {};
  }

  getAll() {
    return this.#store;
  }

  save(key, data) {
    this.#store[key] = data;
    window.localStorage.setItem(this.#key, JSON.stringify(this.#store));
  }

  delete(key) {
    delete this.#store[key];
    window.localStorage.setItem(this.#key, JSON.stringify(this.#store));
  }
}

class Store {
  constructor() {
    this.localStorageModel = new LocalStorageModel();
    const fileObjs = this.localStorageModel.getAll();
    this.fileNames = Object.keys(this.localStorageModel.getAll());
    this.files = this.localStorageModel.getAll();
  }

  getAll() {
    console.log(this.localStorageModel.getAll());
  }

  save(file) {
    const info = {
      name: file.name,
      content: file.content,
    };

    this.localStorageModel.save(file.name, info);
  }
}

class File {
  constructor({ name, notepad, content = '' }) {
    this.id = globalId++;
    this.notepad = notepad;
    this.name = name;
    this.content = content;
  }

  show() {
    const contentArea = this.notepad.wrapperEl.querySelector('.content-area');

    contentArea.textContent = this.content;
    contentArea.setAttribute('contenteditable', true);
    this.notepad.activeTab(this);
  }

  save() {
    const newContent = this.notepad.getMainContent();

    this.content = newContent;

    this.notepad.store.save(this);
  }
}
