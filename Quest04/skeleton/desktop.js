const makeElement = (template) => {
  const container = document.createElement('div');
  container.innerHTML = template;

  return container.children[0];
};

class Desktop {
  /* TODO: Desktop 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
  constructor({ iconCount, folderCount }) {
    this.icons = Array.from(
      { length: iconCount },
      (_, idx) => new Icon(`파일${idx}`)
    );

    this.folders = Array.from(
      { length: folderCount },
      (_, idx) => new Folder(`새폴더${idx}`)
    );
  }

  init() {
    this.icons.forEach((icon) => icon.render());
    this.folders.forEach((folder) => folder.render());
  }
}

class Unit {
  constructor() {}

  render() {
    const root = document.querySelector('.desktop');
    root.appendChild(this.element);

    this.#addMoveEvent();
  }

  #addMoveEvent() {
    const moveEvent = (e) => {
			const x = e.clientX;
			const y = e.clientY;
			console.log(x, y);

			this.element.style.transform = `translate(${x}px, ${y}px)`;
    };

		this.element.style.position = 'absolute';

    this.element.addEventListener('mousedown', (e) => {
			const target = e.currentTarget;
    });

		this.element.addEventListener('mouseover', moveEvent);

    this.element.addEventListener('mouseout', (e) => {
			const target = e.currentTarget;
      target.removeEventListener('mouseover', moveEvent);
    });
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
