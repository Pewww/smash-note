export const getRandomNumber = (range, base = 0) =>
  Math.floor(Math.random() * range) + base;

export const getRandomId = () =>
  Math.random().toString(36).substr(2, 9);
