const makeElement = (template) => {
  const container = document.createElement('div');
  container.innerHTML = template;

  return container.children[0];
};

class Desktop {
  element;
  #icons;

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
    this.#icons = [...icons, ...folders];
  }

  init() {
    this.#icons.forEach((units) => units.render(this.element));

    this.#changeAbsolute();
    this.#addUnitsEvent();
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

    this.#icons.forEach(changeCoordinate);
    this.#icons.forEach(changePosition);
  }

  #addUnitsEvent() {
    const addMoveEvent = ({ element }) => {
      element.addEventListener('mousedown', (e) => {
        e.preventDefault();

        const handleOnMoveEvent = (e) => {
          const { width, height } = element.getClientRects()[0];
          const desktopRect = this.element.getClientRects()[0];

          const maxY = desktopRect.height - height;
          const maxX = desktopRect.width - width;
          const minY = 0;
          const minX = 0;

          const dy = (e.clientY - desktopRect.y) - height / 2;
          const dx = (e.clientX - desktopRect.x) - width / 2;

          element.style.top = `${Math.min(Math.max(dy, minY), maxY)}px`;
          element.style.left = `${Math.min(Math.max(dx, minX), maxX)}px`;
        };

        this.element.addEventListener('mousemove', handleOnMoveEvent);
        this.element.addEventListener('mouseup', () => {
          this.element.removeEventListener('mousemove', handleOnMoveEvent);
        }, { once: true });
      });
    };

    this.#icons.forEach(addMoveEvent);
  }
}

class Icon {
  element;

  constructor(element) {
    this.element = element;
  }

  render(parent) {
    parent.appendChild(this.element);
  }
}

class File extends Icon {
  constructor(name = '새파일') {
    const imgSrc = './assets/file.png';
    const className = 'unit icon';
    const template = `
			<article class="${className}">
				<img src="${imgSrc}">
				<p>${name}</p>
			</article>
		`;

    const element = makeElement(template);
    super(element);
  }
}

class Folder extends Icon {
  #window;

  constructor(name = '새폴더') {
    const imgSrc = './assets/folder.png';
    const className = 'unit folder';

    const template = `
			<article class="${className}">
				<img src="${imgSrc}">
				<p>${name}</p>
			</article>
		`;

    super(makeElement(template));
    this.#window = new Window();
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
    this.#window.render(parent);
  }

  #isOpenWindow() {
    const parent = this.element.parentElement;
    const windows = parent.getElementsByClassName('window');

    for (const el of windows) {
      if (el === this.#window.element) {
        return true;
      }
    }

    return false;
  }
}

class Window {
  element;
  desktop;
  #isInit;

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

    this.#isInit = true;

    this.#addCloseButtonEvent();
    this.#addMoveEvent();
  }

  render(parent) {
    parent.appendChild(this.element);

    if (this.#isInit) {
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
