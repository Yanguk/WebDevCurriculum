const pipe =
  (...fs) =>
  (target) =>
    fs.reduce((acc, f) => f(acc), target);

const parseCookies = pipe(
  (str) => (str ? str.split(';') : []),
  (arr) => arr.map((keyValue) => keyValue.trim().split('=')),
  (list) => list.reduce((acc, cur) => ((acc[cur[0]] = cur[1]), acc), {})
);

module.exports = {
  pipe,
  parseCookies,
};
