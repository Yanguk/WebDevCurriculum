const store = new Map();

let id = 1;

export const getId = () => id++;

export const get = (id: number) => store.get(id);

export const set = (value: string) => {
  const id = getId();

  store.set(id, value);

  return id;
};

export const remove = (id: number) => store.delete(id);
