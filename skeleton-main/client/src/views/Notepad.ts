import fileApi from '@/api/file.api';
import File, { FileInfo } from '@/models/File';
import { vmFactory } from '@/lib/vmFactory';
import { sha256 } from '@/lib/pkg/rust_hash2';
import SHA256 from '@/lib/jsHash';
import { customDebounce } from '@/lib';
import authApi from '@/api/auth.api';

const { useState, useEffect, afterRender, makeComponent } = vmFactory();

const controller = (() => {
  const getTimePerformance = <T extends (...a: any[]) => any>(f: T) => {
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

  const addFile = async (file) => {
    const result = await fileApi.postFile(file);
    console.log(result);

    return result;
  };

  const getTabs = () => {
    // todo: 로컬스토리지에서 꺼내오기
    const tabs = window.localStorage.getItem('tabs');

    return JSON.parse(tabs) || [];
  };

  const saveTabs = <T extends []>(tabs: T) => {
    window.localStorage.setItem('tabs', JSON.stringify(tabs));

    return true;
  };

  return {
    getTimePerformance,
    getAll,
    saveFile,
    addFile,
    getTabs,
    saveTabs,
  };
})();

function Notepad2() {
  const [files, setFiles] = useState([]);
  const [tabs, _setTabs] = useState(controller.getTabs());
  const [curFileId, setCurFileId] = useState(0);
  const [isRust, setIsRust] = useState(false);
  const [isDebounce, setIsDebounce] = useState(false);

  const setTabs = (tabs) => {
    _setTabs(tabs);
    controller.saveTabs(tabs);
  };

  const tabsObj = files.reduce((acc, cur) => ((acc[cur.id] = cur), acc), {});

  useEffect(async () => {
    const files = await controller.getAll();
    const newFiles = files.map((file: FileInfo) => new File(file));

    setFiles(newFiles);
  }, []);

  // 파일리스트 클릭시 활성화
  afterRender((selector) => {
    const fileNodes: NodeList = selector('file', { all: true });

    fileNodes.forEach((node) => {
      node.addEventListener('click', (e) => {
        const targetId = Number(node.id);

        const isActiveTab = tabs.some((id) => targetId === id);

        setCurFileId(targetId);

        if (isActiveTab) {
          return;
        }

        const newTabs = [...tabs, targetId];

        setTabs(newTabs);
      });
    });
  });

  // Add file 버튼 이벤트
  afterRender((selector) => {
    const addButton = selector('new-file-button');
    addButton.addEventListener('click', async () => {
      const fileName = window.prompt('파일명', '');

      if (files.some((file: File) => file.name === fileName)) {
        alert('이미 존재하는 파일명 입니다');

        return;
      }

      const newFileInfo = await controller.addFile({ name: fileName, content: '' });

      const newFile: File = new File({
        id: newFileInfo.id,
        name: newFileInfo.name,
        content: newFileInfo.content,
        activeTab: true,
      });

      setFiles([...files, newFile]);
    });
  });

  //saveButton Event
  afterRender((selector) => {
    const saveButton = selector('save-button') as HTMLElement;
    const targetFile = files.find((file: File) => file.id === curFileId);

    saveButton.addEventListener('click', async () => {
      if (targetFile) {
        await controller.saveFile(targetFile);
      }
    });
  });

  //logout 버튼
  afterRender((selector) => {
    const logoutButton = selector('logout-button');

    logoutButton.addEventListener('click', async (e) => {
      await authApi.logout();

      window.location.reload();
    });
  })

  // tab click 버튼
  afterRender((selector) => {
    const tabs = selector('tab', { all: true });

    tabs.forEach((node) => {
      node.addEventListener('click', (e) => {
        const targetId = e.currentTarget.dataset.id;

        setCurFileId(Number(targetId));
      });
    });
  });

  // tab close 버튼
  afterRender((selector) => {
    const tabButtons = selector('closeTab', { all: true });

    tabButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();

        const targetId = e.currentTarget.dataset.id;

        setTabs(tabs.filter((id) => id !== Number(targetId)));

        if (curFileId === Number(targetId)) {
          setCurFileId(0);
        }
      });
    });
  });

  // 컨텐츠 영역 활성화
  afterRender((selector) => {
    const contextArea = selector('content-area');
    const targetFile = files.find((file: File) => file.id === curFileId);

    if (targetFile) {
      contextArea.setAttribute('contenteditable', true);
    }

    contextArea.innerText = targetFile?.content ?? '';
  });

  // 컨텐츠 영역 onChange
  afterRender((selector) => {
    const hashBoxEl = selector('hash') as HTMLElement;
    const contentEl = selector('content-area') as HTMLElement;
    const buttonEl = selector('hash-button') as HTMLElement;
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

    const hashHandler = isDebounce ? debounceShowHash : showHash;

    if (targetFile?.content) {
      hashHandler();
    }

    contentEl.addEventListener('input', hashHandler);
  });

  // debounce 버튼 이벤트
  afterRender((selector) => {
    const debounceButton = selector('debounce');

    debounceButton.addEventListener('click', () => {
      setIsDebounce(!isDebounce);
    });
  });

  // focus 설정
  afterRender((selector) => {
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

  const tapTemplate = tabs
    .map((id) => {
      const file = tabsObj[id];

      if (!file) {
        return '';
      }

      return `
        <li class="tab ${file.id === curFileId ? 'selected' : ''}" data-id="${file.id}">
          <p class="name">${file.name}</p>
          <button class="closeTab" data-id="${file.id}">X</button>
        </li>
      `;
    })
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
        <button class="debounce">isDebounce: ${isDebounce}</button>
      </div>
      <p class="hash">hash</p>
    </div>
  </section>
</div>
  `;
}

export default makeComponent(Notepad2);
