import Store from '../models/store';
import authApi from '../api/auth.api';
import { go, Option } from 'uk-fp';
import { saveFile } from '@/models/viewModel';

import { sha256 } from '../lib/pkg/rust_hash2';
import { customDebounce } from '@/lib';
import { debounce as lodashDebounce } from 'lodash';
import SHA256 from '@/lib/jsHash';

export default class Notepad {
  wrapperEl: Element;
  store: Store;
  isRust: boolean;
  isDebounce: boolean;

  constructor(wrapperEl) {
    this.isDebounce = false;
    this.isRust = false;
    this.store = new Store();
    this.wrapperEl = wrapperEl;
    this.template = `
<section class="explorer">
    <div class="explorer-header">
      <p>EXPLORER</p>
      <div class="button-wrapper">
        <button class="new-file-button">Add file</button>
        <button class="save-button">Save</button>
        <button class="logout-button">logout</button>
      </div>
    </div>
    <ul class="file-list"></ul>
</section>
<section class="main">
  <ul class="tab-wrapper"></ul>
  <div contenteditable=false class="content-area"></div>
  <div>
    <div class="button-wrapper">
      <button class="hash-button">JS</button>
      <button class="debounce">isDebounce: <span class="isDebounce">${this.isDebounce}</span></button>
    </div>
    <p class="hash">hash</p>
  </div>
</section>
    `;
  }

  async init() {
    await this.store.update();
    this.wrapperEl.insertAdjacentHTML('afterbegin', this.template);
    this.#fileListRender();
    this.#addNewFileButtonEvent();
    this.#addSaveButtonEvent();
    this.#addLogoutButtonEvent();

    this.onChangeContextEvent();
  }

  private onChangeContextEvent() {
    const hashBoxEl = this.wrapperEl.querySelector('.hash') as HTMLElement;
    const contentEl = this.wrapperEl.querySelector('.content-area') as HTMLElement;
    const buttonEl = Option.wrap(this.wrapperEl.querySelector('.hash-button')).unwrap();
    const debounceEl = this.wrapperEl.querySelector('.debounce') as HTMLElement;
    const debounceText = this.wrapperEl.querySelector('.isDebounce') as HTMLElement;

    const rustHashing = sha256;


    const jsHashing = SHA256

    buttonEl.addEventListener('click', () => {
      this.isRust = !this.isRust;

      contentEl.focus();

      buttonEl.textContent = this.isRust ? 'Rust' : 'JS';
    });

    debounceEl.addEventListener('click', () => {
      this.isDebounce = !this.isDebounce;
      debounceText.textContent = String(this.isDebounce);
    })

    const showHash = () => {
      const _startTime: number = performance.now();

      const content = this.getMainContent();

      const hashFn = this.isRust ? rustHashing : jsHashing;
      const hashedText = hashFn(content);

      const _endTime: number = performance.now();

      const performanceTime = (_endTime - _startTime).toFixed(2);

      hashBoxEl.innerHTML = `${hashedText} / <span class="performance">${performanceTime}<span> ms`;
    };

    const debounceShowHash = customDebounce(showHash, 500);

    contentEl.addEventListener('input', () => {
      this.isDebounce ? debounceShowHash() : showHash();
    });
  }

  #addLogoutButtonEvent() {
    const logoutButton = this.wrapperEl.querySelector('.logout-button');

    logoutButton.addEventListener('click', async (e) => {
      await authApi.logout();

      window.location.reload();
    });
  }

  #addSaveButtonEvent() {
    Option.wrap(this.wrapperEl.querySelector('.save-button'))
      .unwrap()
      .addEventListener('click', (e) => {
        e.preventDefault();

        const selectFileEl = this.wrapperEl.querySelector('.selected');

        if (!selectFileEl) {
          return;
        }

        const targetId = selectFileEl.id;
        console.log(this.store);
        const targetFile = this.store.getFiles().filter((file) => `file${file.id}` === targetId)[0];
        console.log(targetFile);
        targetFile.save(this.getMainContent());

        saveFile(targetFile);
      });
  }

  #addNewFileButtonEvent() {
    const newFileButton = this.wrapperEl.querySelector('.new-file-button');

    newFileButton.addEventListener('click', async (e) => {
      this.store.addFile(this);
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

    const fileListTemplate = files.reduce((acc, file) => acc + makeTemplate(file), '');

    fileListEl.innerHTML = fileListTemplate;

    const fileEls = fileListEl.querySelectorAll('.file');

    fileEls.forEach((node) => {
      node.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = node.id;
        const targetFile = this.store.getFiles().filter((file) => `file${file.id}` === targetId)[0];

        targetFile.show(this);
        this.activeTab(targetFile);
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

        const tabEl = this.store.getTabs().filter((tab) => `file${tab.id}` === node.id)[0];

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
    const target = this.wrapperEl.querySelector('.content-area') as HTMLElement;
    const a = target.innerText.replaceAll('\n', '\\n');
    return a;
    // return this.wrapperEl.querySelector('.content-area').innerText;
  }
}
