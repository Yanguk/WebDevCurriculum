const makeElement = (template) => {
  const container = document.createElement('div');
  container.innerHTML = template;

  return container.children[0];
};

class Desktop {
  element;
  units;

  constructor({ desktopEl, iconCount, folderCount }) {
    this.element = desktopEl;

    const icons = Array.from(
      { length: iconCount },
      (_, idx) => new Icon(`파일${idx}`)
    );

    const folders = Array.from(
      { length: folderCount },
      (_, idx) => new Folder(`새폴더${idx}`)
    );

    this.units = [...icons, ...folders];
  }

  init() {
    this.units.forEach((units) => units.render(this.element));

    this.#changeAbsolute();
    this.#addMoveEvent();
  }

  #changeAbsolute() {
    const changeCoordinate = ({ element }) => {
      const { x, y } = element.getClientRects()[0];
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
    };

    const changePosition = ({ element }) => (element.style.position = 'absolute');

    this.units.forEach(changeCoordinate);
    this.units.forEach(changePosition);
  }

  #addMoveEvent() {
    const desktopEl = this.element;

    let targetEl;

    const addEvent = ({ element }) => {
      const { width, height } = element.getClientRects()[0];

      const moveEvent = (e) => {
        element.style.top = `${e.clientY - height / 2}px`;
        element.style.left = `${e.clientX - width / 2}px`;
      };

      element.addEventListener('mousedown', (e) => {
        e.preventDefault();
        targetEl = element;
        targetEl.addEventListener('mousemove', moveEvent);
      });
    };

    this.units.forEach(addEvent);
    //todo: desktop 이벤트로 변경 필요
    this.element.addEventListener('mouseup', () => {
      targetEl.removeEventListener('mousemove', moveEvent);
    });
  }
}

class Unit {
  element;

  constructor() {}

  render(parent) {
    parent.appendChild(this.element);
  }
}

class Icon extends Unit {
  /* TODO: Icon 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
  constructor(name = '새폴더') {
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

class Folder extends Unit {
  /* TODO: Folder 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
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
  }
}

class Window {
  /* TODO: Window 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
}
