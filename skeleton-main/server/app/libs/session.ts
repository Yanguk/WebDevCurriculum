const store = new Map();

let id = 1;

export const getId = () => id++;

export const get = (id: string) => store.get(id);

export const set = (value: string) => {
  const id = getId();

  store.set(id, value);

  return id;
};

export const remove = (id: string) => store.delete(id);
