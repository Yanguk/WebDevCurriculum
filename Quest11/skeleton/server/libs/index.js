const util = require('util');
const crypto = require('node:crypto');

const pipe =
  (...fs) =>
  (target) =>
    fs.reduce((acc, f) => f(acc), target);

const parseCookies = pipe(
  (str) => (str ? str.split(';') : []),
  (arr) => arr.map((keyValue) => keyValue.trim().split('=')),
  (list) => list.reduce((acc, cur) => ((acc[cur[0]] = cur[1]), acc), {})
);

const promiseRandomBytes = util.promisify(crypto.randomBytes);
const promisePbkdf2 = util.promisify(crypto.pbkdf2);

const createSalt = async () => {
  const buf = await promiseRandomBytes(64);
  return buf.toString('base64');
};

const createHashedPassword = async (password) => {
  const salt = await createSalt();
  const hash = await promisePbkdf2(password, salt, 100000, 64, 'sha512');
  const hashedPassword = hash.toString('base64');

  return { hashedPassword, salt };
};

const verifyPassword = async (password, userSalt, userPassword) => {
  const hash = await promisePbkdf2(password, userSalt, 100000, 64, 'sha512');
  const hashedPassword = hash.toString('base64');

  return hashedPassword === userPassword;
};

module.exports = {
  pipe,
  parseCookies,
  createHashedPassword,
  verifyPassword,
};
