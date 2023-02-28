export default class File {
  constructor({ id, name, content, activeTab = false }) {
    this.id = id;
    this.name = name;
    this.content = content;
    this.activeTab = activeTab;
  }

  show(notepad) {
    const contentArea = notepad.wrapperEl.querySelector('.content-area');
    console.log(this.content);
    contentArea.innerText = this.content;
    contentArea.setAttribute('contenteditable', true);
  }

  save(content) {
    this.content = content;
  }
}
