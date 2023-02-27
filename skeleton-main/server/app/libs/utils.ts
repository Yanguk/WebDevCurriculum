import { promisify } from 'util';
import { pbkdf2, randomBytes } from 'node:crypto';
import { pipe } from 'uk-fp';

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
