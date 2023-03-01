import fileApi from '@/api/file.api';
import File, { FileInfo } from '@/models/File';
import { vmFactory } from '@/lib/vmFactory';
import { sha256 } from '@/lib/pkg/rust_hash2';
import SHA256 from '@/lib/jsHash';

const VM = vmFactory();

const controller = (() => {
  const getTimePerformance = (f) => {
    const _startTime: number = performance.now();

    const result = f();

    const _endTime: number = performance.now();

    const performanceTime = (_endTime - _startTime).toFixed(3);

    return [result, performanceTime];
  };

  const getAll = async () => {
    const { data } = await fileApi.getAll();

    return data;
  };

  const saveFile = async (file: File) => {
    const result = await fileApi.putFile(file);
    console.log(result);
  };

  const addFile = async (file: File) => {
    const result = await fileApi.postFile(file);
    console.log(result);
  };

  return {
    getTimePerformance,
    getAll,
    saveFile,
    addFile,
  };
})();

function Notepad2() {
  const [files, setFiles] = VM.useState([]);
  const [curFileId, setCurFileId] = VM.useState(0);
  const [isRust, setIsRust] = VM.useState(false);
  const [isDebounce, setIsDebounce] = VM.useState(false);

  VM.useEffect(async () => {
    const files = await controller.getAll();
    const newFiles = files.map((file: FileInfo) => new File(file));

    setFiles(newFiles);
  }, []);

  // 파일리스트 클릭시 활성화
  VM.afterRender((selector) => {
    const fileNodes: NodeList = selector('file', { all: true });

    fileNodes.forEach((node) => {
      node.addEventListener('click', (e) => {
        const targetId = Number(node.id);

        const newFiles = files.map((file: File) =>
          file.id === targetId ? new File({ ...file, activeTab: true }) : file,
        );

        setCurFileId(targetId);
        setFiles(newFiles);
      });
    });
  });

  // 컨텐츠 영역 활성화
  VM.afterRender((selector) => {
    const contextArea = selector('content-area');
    const targetFile = files.find((file: File) => file.id === curFileId);

    if (targetFile) {
      contextArea.setAttribute('contenteditable', true);
    }

    contextArea.textContent = targetFile?.content ?? '';
  });

  // 컨텐츠 영역 onChange
  VM.afterRender((selector) => {
    const hashBoxEl = selector('hash') as HTMLElement;
    const contentEl = selector('content-area') as HTMLElement;
    const buttonEl = selector('hash-button') as HTMLElement;
    // const debounceEl = selector('.debounce') as HTMLElement;
    // const debounceText = selector('.isDebounce') as HTMLElement;
    const targetFile = files.find((file: File) => file.id === curFileId);

    const rustHashing = sha256;
    const jsHashing = SHA256;
    const hashFn = isRust ? rustHashing : jsHashing;

    buttonEl.addEventListener('click', () => {
      setIsRust(!isRust);
    });

    const showHash = () => {
      const content = contentEl.innerText;
      const [hashedText, performanceTime] = controller.getTimePerformance(() => hashFn(content));

      if (targetFile) {
        targetFile.content = contentEl.innerText;
      }

      hashBoxEl.innerHTML = `${hashedText} / <span class="performance">${performanceTime}<span> ms`;
    };

    const debounceShowHash = customDebounce(showHash, 500);

    if (targetFile.content) {
      showHash();
    }

    contentEl.addEventListener('input', showHash);
  });

  //saveButton Event
  VM.afterRender((selector) => {
    const saveButton = selector('save-button') as HTMLElement;
    const contentEl = selector('content-area') as HTMLElement;
    const targetFile = files.find((file: File) => file.id === curFileId);

    saveButton.addEventListener('click', async (e) => {
      if (targetFile) {
        console.log(targetFile);
        await controller.saveFile(targetFile);
        console.log(123);
      }
    });
  });

  VM.afterRender((selector) => {
    const contentEl = selector('content-area') as HTMLElement;
    contentEl.focus();
  });

  const fileTemplate = files
    .map(
      (file: File) => `
    <li class="file ${file.id === curFileId ? 'selected' : ''}" id="${file.id}">
      <p>${file.name}</p>
      <button class="delete">X</button>
    </li>
  `,
    )
    .join('');

  const tapTemplate = files
    .filter((file: File) => file.activeTab)
    .map(
      (file: File) => `
      <li class="tab ${file.id === curFileId ? 'selected' : ''}" id="file${file.id}">
        <p class="name">${file.name}</p>
        <button class="closeTab">X</button>
      </li>
    `,
    )
    .join('');

  return `
<div class='editor-wrapper'>
  <section class="explorer">
      <div class="explorer-header">
        <p>EXPLORER</p>
        <div class="button-wrapper">
          <button class="new-file-button">Add file</button>
          <button class="save-button">Save</button>
          <button class="logout-button">logout</button>
        </div>
      </div>
      <ul class="file-list">
        ${fileTemplate}
      </ul>
  </section>
  <section class="main">
    <ul class="tab-wrapper">
      ${tapTemplate}
    </ul>
    <div contenteditable=false class="content-area"></div>
    <div>
      <div class="button-wrapper">
        <button class="hash-button">${isRust ? 'Rust' : 'JS'}</button>
        <button class="debounce">isDebounce: <span class="isDebounce">${false}</span></button>
      </div>
      <p class="hash"></p>
    </div>
  </section>
</div>
  `;
}

export default VM.makeComponent(Notepad2);
