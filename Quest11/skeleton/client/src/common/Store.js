import fileApi from '../api/file.api';
import File from './File';
import LocalStorageModel from './LocalStorage';

export default class Store {
  #localStorageModel;
  #files;
  #tabs;

  constructor() {
    this.#localStorageModel = new LocalStorageModel();
    this.#files = [];
    this.#tabs = [];
  }

  async update() {
    const result = await fileApi.getAll();

    const files = result.data.map(({ name, content, activeTab, id }) => {
      return new File({
        id,
        name,
        content,
        activeTab: false,
      });
    });

    this.#files = files;
    this.#tabs = files.filter((file) => file.activeTab);
  }

  async delete(fileName) {
    await authApi.deleteFile(fileName);
    await this.update();
  }

  getId() {
    return this.#localStorageModel.getId();
  }

  getFiles() {
    return this.#files;
  }

  async addFile(notepad) {
    const newId = this.#localStorageModel.getId();

    const { id } = await fileApi.postFile({
      name: `파일${newId}.txt`,
      content: '',
    });

    const file = new File({
      notepad,
      id,
      name: `파일${newId}.txt`,
      content: '',
    });

    return this.update();
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
