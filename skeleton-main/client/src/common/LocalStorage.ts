export default class LocalStorageModel {
  #idKey;
  #uniqId;

  constructor() {
    this.#idKey = 'id';
    this.#uniqId = JSON.parse(window.localStorage.getItem(this.#idKey)) || 1;
  }

  getId() {
    this.#uniqId += 1;

    window.localStorage.setItem(this.#idKey, this.#uniqId);

    return this.#uniqId;
  }
}
