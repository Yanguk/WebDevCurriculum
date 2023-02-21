import { promisify } from 'util';
import { pbkdf2, randomBytes } from 'node:crypto';
import { ArityFunction, FirstParameters, LastReturnType } from '../types/Pipe';

const pipe =
  <T extends ArityFunction[]>(
    ...fs: T
  ): ((..._args: FirstParameters<T>) => LastReturnType<T>) =>
  (...args: FirstParameters<T>): LastReturnType<T> =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fs.reduce((acc: any, f: any) => f(acc), args);

export const parseCookies = pipe(
  (str: string) => (str ? str.split(';') : []),
  (arr: string[]) => arr.map((keyValue) => keyValue.trim().split('=')),
  (list: string[][]) => {
    const init: { [index: string]: string } = {};

    return list.reduce(
      (acc, cur: string[]) => ((acc[cur[0]] = cur[1]), acc),
      init
    );
  }
);

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
  userPassword: string
) => {
  const hash = await promisePbkdf2(password, userSalt, 100000, 64, 'sha512');
  const hashedPassword = hash.toString('base64');

  return hashedPassword === userPassword;
};
