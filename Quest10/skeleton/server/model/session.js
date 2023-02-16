const store = new Map();
let id = 1;

const getId = () => id++;

const get = (id) => store.get(id);

const set = (value) => {
  const id = getId();

  store.set(id, value);

  return id;
};

module.exports = {
  get,
  set,
  delete: (id) => store.delete(id),
  getId,
};
