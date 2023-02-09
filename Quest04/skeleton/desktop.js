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
      console.log(x, y);
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
    this.window.open(parent);
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
  }

  open(parent) {
    parent.appendChild(this.element);

    this.desktop.init();
  }

  #addCloseButtonEvent() {
    const closeWindow = (e) => {
      this.element.style.top = '30px';
      this.element.style.left = '30px';

      this.element.remove();
    };
    const closeButton = this.element.querySelector('.close');
    closeButton.addEventListener('click', closeWindow);
  }

  #addMoveEvent() {
    const barEl = this.element.querySelector('.head-bar');
    const windowEl = this.element;

    let initClickRect = { x: 0, y: 0 };
    let dx = 0;
    let dy = 0;

    const handleOnMoveEvent = (e) => {
      dx = e.clientX - initClickRect.x;
      dy = e.clientY - initClickRect.y;
      console.log('window Move')
      windowEl.style.transform = `translate(${dx}px, ${dy}px)`;
    };

    const removeEvent = (e) => {
      window.removeEventListener('mousemove', handleOnMoveEvent);
      windowEl.style.top = `${windowEl.offsetTop + dy}px`;
      windowEl.style.left = `${windowEl.offsetLeft + dx}px`;
      windowEl.style.transform = 'translate(0px, 0px)';
    };

    const handleOnMousedown = (e) => {
      initClickRect.x = e.clientX;
      initClickRect.y = e.clientY;

      console.log(123213);
      window.addEventListener('mousemove', handleOnMoveEvent);
      window.addEventListener('mouseup', removeEvent, { once: true });
    };

    barEl.addEventListener('mousedown', handleOnMousedown);

  }
}
