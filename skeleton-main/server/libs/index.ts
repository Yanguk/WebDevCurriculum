import util from 'util';
import crypto from 'node:crypto';
import {
  ArityOneFn,
  FirstFnParameterType,
  LastFnReturnType,
} from '../types/Pipe';

const pipe =
  <T extends ArityOneFn[]>(...fs: T) =>
  (target: FirstFnParameterType<T>): LastFnReturnType<T> =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fs.reduce((acc: any, f: any) => f(acc), target);

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

const promiseRandomBytes = util.promisify(crypto.randomBytes);
const promisePbkdf2 = util.promisify(crypto.pbkdf2);

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

export const verifyPassword = async (password: string, userSalt: string, userPassword: string) => {
  const hash = await promisePbkdf2(password, userSalt, 100000, 64, 'sha512');
  const hashedPassword = hash.toString('base64');

  return hashedPassword === userPassword;
};
