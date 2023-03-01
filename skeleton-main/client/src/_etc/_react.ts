export default class React {
  private states: any[];
  private idx: number;
  private component: Component | null;

  constructor(component) {
    this.states = [];
    this.idx = 0;
    this.component = new Component(component, this);
  }

  private render() {
    this.idx = 0;

    this.component?.run();
  }

  public useState<T>(initialState: T): [T, typeof setState] {
    const state = this.states[this.idx] || initialState;
    const curIdx = this.idx;

    const setState = (newState: T): void => {
      this.states[curIdx] = newState;

      this.render();
    };

    this.idx++;

    return [state, setState];
  }
}

class Component {
  private rootEl: Element | null;

  constructor(private component: () => string, private react: React) {
    this.rootEl = null;
  }

  public run() {
    if (!this.rootEl) {
      return;
    }

    this.rootEl.innerHTML = this.component();
  }

  public render(rootEl) {
    this.rootEl = rootEl;

    this.run();
  }
}
