import fileApi from "@/api/file.api";
import { File } from "@/types";

const subscribes: Function[] = [];

const saveFile = async (file: File) => {
  const result = await fileApi.postFile(file);
  console.log(file);
  console.log(result);
};

const on = (f: (targetFile: file) => void) => {

};

export {
  saveFile,
  on,
};
