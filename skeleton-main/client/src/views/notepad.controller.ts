import fileApi from "@/api/file.api";

const getTimePerformance = <T extends (...a: unknown[]) => unknown>(f: T) => {
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
  await fileApi.putFile(file);

  return true;
};

const addFile = async (file) => {
  const result = await fileApi.postFile(file);

  return result;
};

const getTabs = () => {
  // todo: 로컬스토리지에서 꺼내오기
  const tabs = window.sessionStorage.getItem('tabs');

  return JSON.parse(tabs) || [];
};

const saveTabs = <T extends []>(tabs: T) => {
  window.sessionStorage.setItem('tabs', JSON.stringify(tabs));

  return true;
};

const getCurFileId = () => {
  return Number(window.sessionStorage.getItem('file')) || 0;
};

const saveCurFileId = (id) => {
  window.sessionStorage.setItem('file', `${id}`);

  return;
};

const deleteFile = async (id: number) => {
  const result = await fileApi.deleteFile(id);
  return result;
};

const checkFileName = (name: string) => {
  const reges = /^[a-zA-Z0-9가-힣_-]+\.[a-zA-Z0-9]+$/;
  return reges.test(name);
};

export {
  getTimePerformance,
  getAll,
  saveFile,
  addFile,
  getTabs,
  saveTabs,
  getCurFileId,
  saveCurFileId,
  deleteFile,
  checkFileName,
};
