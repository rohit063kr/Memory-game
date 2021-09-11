export const randomInt = (min, max) =>
  Math.trunc(Math.random() * (max - min)) + min;

export const wait = function (sec) {
  return new Promise(function (resolve, _) {
    setTimeout(resolve, sec * 1000);
  });
};
