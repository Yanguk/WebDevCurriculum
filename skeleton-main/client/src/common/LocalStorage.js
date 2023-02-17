export default class LocalStorageModel {
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
