export type FileInfo = {
  id: number;
  name: string;
  content: string;
  activeTab: boolean;
};

export default class File {
  public id: number;
  public name: string;
  public content: string;
  public activeTab: boolean;

  constructor({ id, name, content, activeTab }: FileInfo) {
    this.id = id;
    this.name = name;
    this.content = content;
    this.activeTab = activeTab;
  }
}
