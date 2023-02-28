import { pipe } from 'uk-fp';

export const parseCookies = pipe(
  (str: string) => (str ? str.split(';') : []),
  (arr) => arr.map((keyValue) => keyValue.trim().split('=')),
  (list) => {
    const acc: { [name: string]: string } = {};

    return list.reduce((acc, cur) => ((acc[cur[0]] = cur[1]), acc), acc);
  }
);

export const getJwtToken = () => {
  const tokenInfo = parseCookies(document.cookie);
  const token = tokenInfo['jwt'] ?? '';

  return token;
};

export const customDebounce = (f, time) => {
  let timeout;

  return () => {
    clearInterval(timeout);

    timeout = setTimeout(f, time)
  }
}