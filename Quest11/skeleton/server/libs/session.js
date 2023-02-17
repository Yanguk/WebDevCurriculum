const store = new Map();

let id = 1;

const getId = () => id++;

const get = (id) => store.get(id);

const set = (value) => {
  const id = getId();

  store.set(id, value);

  return id;
};

const remove = (id) => store.delete(id);

module.exports = {
  get,
  set,
  delete: remove,
  getId,
};
