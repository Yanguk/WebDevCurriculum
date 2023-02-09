const makeElement = (template) => {
  const container = document.createElement('div');
  container.innerHTML = template;

  return container.children[0];
};

class Desktop {
  constructor({ desktopEl, iconCount, folderCount }) {
    const icons = Array.from(
      { length: iconCount },
      (_, idx) => new File(`파일${idx}`)
    );

    const folders = Array.from(
      { length: folderCount },
      (_, idx) => new Folder(`새폴더${idx}`)
    );

    this.element = desktopEl;
    this.units = [...icons, ...folders];
  }

  init() {
    this.units.forEach((units) => units.render(this.element));

    this.#changeAbsolute();
    this.#addMoveEvent();
  }

  #changeAbsolute() {
    const parent = this.element.parentElement;
    const parentRect = parent.getClientRects()[0];

    const changeCoordinate = ({ element }) => {
      const { x, y } = element.getClientRects()[0];

      element.style.left = `${x - parentRect.x}px`;
      element.style.top = `${y - parentRect.y}px`;
    };

    const changePosition = ({ element }) =>
      (element.style.position = 'absolute');

    this.units.forEach(changeCoordinate);
    this.units.forEach(changePosition);
  }

  #addMoveEvent() {
    const desktopEl = this.element;
    const windowEl = desktopEl.parentElement;
    const windowRect = windowEl.getClientRects()[0];

    const addMoveEvent = ({ element }) => {
      const { width, height } = element.getClientRects()[0];
      const desktopRect = desktopEl.getClientRects()[0];

      const handleOnMoveEvent = (e) => {
        element.style.top = `${
          Math.min(
            Math.max(e.clientY - height / 2, windowRect.y),
            desktopRect.height - height
          ) - windowRect.y
        }px`;

        element.style.left = `${
          Math.min(
            Math.max(e.clientX - width / 2, windowRect.x),
            desktopRect.width - width
          ) - windowRect.x
        }px`;
      };

      element.addEventListener('mousedown', (e) => {
        e.preventDefault();

        desktopEl.addEventListener('mousemove', handleOnMoveEvent);
        desktopEl.addEventListener('mouseup', () => {
          desktopEl.removeEventListener('mousemove', handleOnMoveEvent);
        }, { once: true });
      });
    };

    this.units.forEach(addMoveEvent);
  }
}

class Icon {
  element;
  constructor() {}

  render(parent) {
    parent.appendChild(this.element);
  }
}

class File extends Icon {
  constructor(name = '새파일') {
    super();

    const imgSrc = './assets/file.png';
    const className = 'unit icon';
    const template = `
			<article class="${className}">
				<img src="${imgSrc}">
				<p>${name}</p>
			</article>
		`;

    this.element = makeElement(template);
  }
}

class Folder extends Icon {
  constructor(name = '새폴더') {
    super();

    const imgSrc = './assets/folder.png';
    const className = 'unit folder';

    const template = `
			<article class="${className}">
				<img src="${imgSrc}">
				<p>${name}</p>
			</article>
		`;

    this.element = makeElement(template);
    this.window = new Window();
  }

  render(parent) {
    parent.appendChild(this.element);

    this.#addDoubleClickEvent();
  }

  #addDoubleClickEvent() {
    this.element.addEventListener('dblclick', (e) => {
      if (this.#isOpenWindow()) return;

      this.#openWindow();
    });
  }

  #openWindow() {
    const parent = this.element.parentElement;
    this.window.render(parent);
  }

  #isOpenWindow() {
    const parent = this.element.parentElement;
    const windows = parent.getElementsByClassName('window');

    for (const el of windows) {
      if (el === this.window.element) {
        return true;
      }
    }

    return false;
  }
}

class Window {
  constructor() {
    const className = 'window';
    const template = `
      <div class="${className}">
        <div class="head-bar">
          <button class="close">X</button>
        </div>
        <section class="desktop"></section>
      </div>
    `;

    this.element = makeElement(template);

    this.desktop = new Desktop({
      desktopEl: this.element.querySelector('.desktop'),
      iconCount: 2,
    });

    this.#addCloseButtonEvent();
    this.#addMoveEvent();
    this.isInit = true;
  }

  render(parent) {
    parent.appendChild(this.element);

    if (this.isInit) {
      this.desktop.init();
      this.isInit = false;
    }
  }

  #addCloseButtonEvent() {
    const closeWindow = (e) => {
      if (e.target === e.currentTarget) {
        this.element.remove();
      }
    };

    const closeButton = this.element.querySelector('.close');
    closeButton.addEventListener('click', closeWindow);
  }

  #addMoveEvent() {
    const barEl = this.element.querySelector('.head-bar');

    let initClickRect = { x: 0, y: 0 };
    let dx = 0;
    let dy = 0;

    const handleOnMoveEvent = (e) => {
      dx = e.clientX - initClickRect.x;
      dy = e.clientY - initClickRect.y;

      this.element.style.transform = `translate(${dx}px, ${dy}px)`;
    };

    const removeEvent = (e) => {
      window.removeEventListener('mousemove', handleOnMoveEvent);
      this.element.style.top = `${this.element.offsetTop + dy}px`;
      this.element.style.left = `${this.element.offsetLeft + dx}px`;
      this.element.style.transform = 'translate(0px, 0px)';
    };

    const handleOnMousedown = (e) => {
      if (e.target === e.currentTarget) {
        initClickRect.x = e.clientX;
        initClickRect.y = e.clientY;

        window.addEventListener('mousemove', handleOnMoveEvent);
        window.addEventListener('mouseup', removeEvent, { once: true });
      }
    };

    barEl.addEventListener('mousedown', handleOnMousedown);

  }
}
