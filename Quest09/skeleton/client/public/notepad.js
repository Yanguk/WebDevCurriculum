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

  async init() {
    await this.store.update();
    this.wrapperEl.insertAdjacentHTML('afterbegin', this.template);
    this.#fileListRender();
    this.#addNewFileButtonEvent();
    this.#addSaveButtonEvent();
  }

  #addSaveButtonEvent() {
    this.wrapperEl
      .querySelector('.save-button')
      .addEventListener('click', (e) => {
        e.preventDefault();

        const selectFileEl = this.wrapperEl.querySelector('.selected');

        if (!selectFileEl) {
          return;
        }

        const targetId = selectFileEl.id;

        const targetFile = this.store
          .getFiles()
          .filter((file) => `file${file.id}` === targetId)[0];

        targetFile.save(this);
      });
  }

  #addNewFileButtonEvent() {
    const newFileButton = this.wrapperEl.querySelector('.new-file-button');

    newFileButton.addEventListener('click', async (e) => {
      await this.store.addFile(this);
      this.#fileListRender();
    });
  }

  #fileListRender() {
    const fileListEl = this.wrapperEl.querySelector('.file-list');
    const files = this.store.getFiles();

    const makeTemplate = (file) => `
      <li class="file" id="file${file.id}">
        <p>${file.name}</p>
        <button class="delete">X</button>
      </li>
    `;

    const fileListTemplate = files.reduce(
      (acc, file) => acc + makeTemplate(file),
      ''
    );

    fileListEl.innerHTML = fileListTemplate;

    const fileEls = fileListEl.querySelectorAll('.file');

    fileEls.forEach((node) => {
      node.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = node.id;
        const targetFile = this.store
          .getFiles()
          .filter((file) => `file${file.id}` === targetId)[0];

        targetFile.show(this);
      });
    });

    this.#addDeleteEvent();
  }

  activeTab(tab) {
    if (!this.#isExitedTab(tab)) {
      this.store.addTabs(tab);
    }

    const tabWrapper = this.wrapperEl.querySelector('.tab-wrapper');

    const makeTabTemplate = (tab) => `
      <li class="tab" id="file${tab.id}">
        <p class="name">${tab.name}</p>
        <button class="closeTab">X</button>
      </li>
    `;

    const template = this.store.getTabs().reduce((acc, cur) => {
      return (acc += makeTabTemplate(cur));
    }, '');

    tabWrapper.innerHTML = template;

    this.#selectTab(tab);
    this.#addTabClickEvent();
  }

  closeTab(fileId) {
    const tab = this.wrapperEl.querySelector(`.tab-wrapper #${fileId}`);
    this.store.removeTab(fileId);
    tab?.remove();
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

        const tabEl = this.store
          .getTabs()
          .filter((tab) => `file${tab.id}` === node.id)[0];

        this.activeTab(tabEl);

        tabEl.show(this);
      });

      const button = node.querySelector('button');
      const tabId = node.id;

      button.addEventListener('click', (e) => {
        e.stopPropagation();

        this.#unSelectPreTab();
        this.closeTab(tabId);
        this.inActiveTextArea();
      });
    });
  }

  #unSelectPreTab() {
    const preSelectTabs = this.wrapperEl.querySelectorAll('.selected');

    preSelectTabs.forEach((tab) => {
      tab.classList.remove('selected');
    });
  }

  #selectTab(tab) {
    this.#unSelectPreTab();

    const targets = this.wrapperEl.querySelectorAll(`#file${tab.id}`);
    targets.forEach((target) => target.classList.add('selected'));
  }

  #isExitedTab(file) {
    return !!this.wrapperEl.querySelector(`.tab-wrapper #file${file?.id}`);
  }

  #addDeleteEvent() {
    const buttons = this.wrapperEl.querySelectorAll('.file-list .delete');

    buttons.forEach((node) => {
      const fileName = node.parentNode.children[0].textContent;
      const fileId = node.parentNode.id;

      node.addEventListener('click', async (e) => {
        e.stopPropagation();

        await this.store.delete(fileName);
        this.closeTab(fileId);
        this.#fileListRender();

        this.inActiveTextArea();
      });
    });
  }

  inActiveTextArea() {
    const textArea = this.wrapperEl.querySelector('.content-area');
    textArea.setAttribute('contenteditable', false);
    textArea.textContent = '';
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
  }

  async update() {
    const data = await Api.getAll();

    const files = data.map(({ name, content }, idx) => {
      return new File({
        id: idx,
        name,
        content,
      });
    });

    this.#files = files;
  }

  async save(file) {
    await Api.postFile(file);
    await this.update();
  }

  async delete(fileName) {
    await Api.delete(fileName);
    await this.update();
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
      id: newId,
      name: `파일${newId}.txt`,
      content: '',
    });

    return this.save(file);
  }

  getTabs() {
    return this.#tabs;
  }

  addTabs(file) {
    return this.#tabs.push(file);
  }

  removeTab(id) {
    this.#tabs = this.#tabs.filter((file) => `file${file.id}` !== id);
    this.update();
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

const apiUrl = 'http://localhost:8000';

class Api {
  static async getAll() {
    const response = await fetch(`${apiUrl}/files`);
    const data = await response.json();

    return data;
  }

  static async postFile({ name, content }) {
    const response = await fetch(`${apiUrl}/file`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ name, content }),
    });

    const data = await response.json();

    return data.ok;
  }

  static async delete(name) {
    const response = await fetch(`${apiUrl}/file`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    const data = await response.json();

    return data.ok;
  }
}
