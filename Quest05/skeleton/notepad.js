class Notepad {
  /* TODO: 그 외에 또 어떤 클래스와 메소드가 정의되어야 할까요? */
  wrapperEl;
  store;

  constructor(wrapperEl) {
    this.store = new Store();
    this.wrapperEl = wrapperEl;
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

        this.store
          .getFiles()
          .filter((file) => file.id === targetId.slice(4))[0]
          .save(this);
      });
  }

  #addNewFileButtonEvent() {
    const newFileButton = this.wrapperEl.querySelector('.new-file-button');

    newFileButton.addEventListener('click', (e) => {
      this.store.addFile(this);
      this.#fileListRender();
    });
  }

  #fileListRender() {
    const fileListEl = this.wrapperEl.querySelector('.file-list');
    const files = this.store.getFiles();

    const makeTemplate = (file) => `
      <li class="file" id="file${file.id}">
        <img><p>${file.name}</p>
      </li>
    `;

    const fileListTemplate = Object.keys(files).reduce(
      (acc, fileId) => acc + makeTemplate(files[fileId]),
      ''
    );

    fileListEl.innerHTML = fileListTemplate;

    const fileEls = fileListEl.querySelectorAll('.file');

    fileEls.forEach((node, idx) => {
      node.addEventListener('click', (e) => {
        files[idx].show(this);
      });
    });
  }

  activeTab(tab) {
    if (!this.#isExitedTab(tab)) {
      this.store.addTabs(tab);
    }

    const tabWrapper = this.wrapperEl.querySelector('.tab-wrapper');
    const makeTabTemplate = (tab) => `
      <li class="tab" id="file${tab.id}">
        <span class="name">${tab.name}</span>
      </li>
    `;

    const template = this.store.getTabs().reduce((acc, cur) => {
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

        const tabEl = this.store.getTabs()[idx];

        this.activeTab(tabEl);
        tabEl.show(this);
      });
    });
  }

  #selectTab(tab) {
    const preSelectTabs = this.wrapperEl.querySelectorAll('.selected');

    preSelectTabs.forEach((tab) => {
      tab.classList.remove('selected')
    });

    const targets = this.wrapperEl.querySelectorAll(`#file${tab.id}`);
    targets.forEach((target) => target.classList.add('selected'));
  }

  #isExitedTab(file) {
    return !!this.wrapperEl.querySelector(`.tab-wrapper #file${file.id}`);
  }

  getMainContent() {
    return this.wrapperEl.querySelector('.content-area').textContent;
  }
}

class LocalStorageModel {
  #itemKey;
  #idKey;
  #store;
  #uniqId;

  constructor() {
    this.#itemKey = 'list';
    this.#idKey = 'id';
    this.#store = JSON.parse(window.localStorage.getItem(this.#itemKey)) || {};
    this.#uniqId = JSON.parse(window.localStorage.getItem(this.#idKey)) || 1;
  }

  getAll() {
    return this.#store;
  }

  save(key, data) {
    this.#store[key] = data;
    window.localStorage.setItem(this.#itemKey, JSON.stringify(this.#store));
  }

  delete(key) {
    delete this.#store[key];
    window.localStorage.setItem(this.#itemKey, JSON.stringify(this.#store));
  }

  getId() {
    this.#uniqId += 1;
    window.localStorage.setItem(this.#idKey, this.#uniqId);

    return this.#uniqId;
  }
}

class Store {
  #localStorageModel;
  #files;
  #tabs;

  constructor() {
    this.#localStorageModel = new LocalStorageModel();
    this.#files = [];
    this.#tabs = [];

    const files = this.#localStorageModel.getAll();

    Object.keys(files).forEach((id) => {
      const targetInfo = files[id];

      const file = new File({ id, name: targetInfo.name, content: targetInfo.content });

      this.#files.push(file);
    });
  }

  save(file) {
    const info = {
      id: file.id,
      name: file.name,
      content: file.content,
    };

    this.#localStorageModel.save(file.id, info);
  }

  delete(file) {
    this.#localStorageModel.delete(file.id);
  }

  getId() {
    return this.#localStorageModel.getId();
  }

  getFiles() {
    return this.#files;
  }

  addFile(notepad) {
    const newId = notepad.store.getId();

    const file = new File({
      notepad,
      id: notepad.store.getId(),
      name: `파일${newId}`,
      content: '',
    });

    this.#files.push(file);
    this.save(file);
  }

  getTabs() {
    return this.#tabs;
  }

  addTabs(file) {
    return this.#tabs.push(file);
  }
}

class File {
  constructor({ id, name, content = '' }) {
    this.id = id;
    this.name = name;
    this.content = content;
  }

  show(notepad) {
    const contentArea = notepad.wrapperEl.querySelector('.content-area');

    contentArea.textContent = this.content;
    contentArea.setAttribute('contenteditable', true);
    notepad.activeTab(this);
  }

  save(notepad) {
    this.content = notepad.getMainContent();
    notepad.store.save(this);
  }
}
