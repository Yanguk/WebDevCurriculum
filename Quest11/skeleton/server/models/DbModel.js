const fs = require('node:fs/promises');
const path = require('node:path');
const dbPath = path.join(__dirname, '../db');

const getAll = async () => {
  const fileList = await fs.readdir(dbPath);

  const data = await Promise.all(
    fileList.map((name) => {
      return fs.readFile(`${dbPath}/${name}`, { encoding: 'utf-8' });
    })
  );

  return data.map((content, idx) => ({ name: fileList[idx], content }));
};

const writeFile = async (fileName, content) =>
  fs.writeFile(`${dbPath}/${fileName}`, content);

const updateName = async (oldName, newName) =>
  fs.rename(`${dbPath}/${oldName}`, `${dbPath}/${newName}`);

const remove = async (fileName) => fs.unlink(`${dbPath}/${fileName}`);

module.exports = {
  getAll,
  writeFile,
  updateName,
  remove,
};
