import { promisify } from 'util';
import { pbkdf2, randomBytes } from 'node:crypto';
import { ArityFunction, FirstParameters, LastReturnType } from '../types/utils';

export const range = (count: number): number[] =>
  new Array(count).fill(0).map((_, idx) => idx);

const promiseRandomBytes = promisify(randomBytes);
const promisePbkdf2 = promisify(pbkdf2);

const createSalt = async () => {
  const buf = await promiseRandomBytes(64);
  return buf.toString('base64');
};

export const createHashedPassword = async (password: string) => {
  const salt = await createSalt();
  const hash = await promisePbkdf2(password, salt, 100000, 64, 'sha512');
  const hashedPassword = hash.toString('base64');

  return { hashedPassword, salt };
};

export const verifyPassword = async (
  password: string,
  userSalt: string,
  userPassword: string,
) => {
  const hash = await promisePbkdf2(password, userSalt, 100000, 64, 'sha512');
  const hashedPassword = hash.toString('base64');

  return hashedPassword === userPassword;
};

export const pipe =
<T extends ArityFunction[]>(...fs: T) =>
  (...args: FirstParameters<T>): LastReturnType<T> =>
    fs.reduce((acc: unknown, f) => f(acc), args);

export const go = <T extends ArityFunction[]>(
  target: FirstParameters<T>[0],
  ...fs: T
): LastReturnType<T> => {
  const iter = fs[Symbol.iterator]();

  let acc = iter.next().value(target);

  for (const f of iter) {
    acc = f(acc);
  }

  return acc;
};

export const asyncGo = async <T extends ArityFunction[]>(
  target: FirstParameters<T>[0] | Promise<FirstParameters<T>[0]>,
  ...fs: T
): Promise<LastReturnType<T>> => {
  const iter = fs[Symbol.iterator]();

  let acc = await iter.next().value(target);

  for (const f of iter) {
    acc = await f(acc);
  }

  return acc;
};

export function* intoIter<T extends { [key: string]: unknown }>(obj: T) {
  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      yield [key, obj[key]];
    }
  }
}

export const parseCookies = pipe(
  (str: string) => (str ? str.split(';') : []),
  (arr: string[]) => arr.map((keyValue) => keyValue.trim().split('=')),
  (list: string[][]) =>
    list.reduce(
      (acc: { [index: string]: string }, cur: string[]) => (
        (acc[cur[0]] = cur[1]), acc
      ),
      {},
    ),
);
