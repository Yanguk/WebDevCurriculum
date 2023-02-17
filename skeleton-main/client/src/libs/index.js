export const pipe =
  (...fs) =>
  (target) =>
    fs.reduce((acc, f) => f(acc), target);

export const parseCookies = pipe(
  (str) => (str ? str.split(';') : []),
  (arr) => arr.map((keyValue) => keyValue.trim().split('=')),
  (list) => list.reduce((acc, cur) => ((acc[cur[0]] = cur[1]), acc), {})
);

export const getJwtToken = () => {
  const tokenInfo = parseCookies(document.cookie);
  const token = tokenInfo['jwt'] ?? '';

  return token;
};
