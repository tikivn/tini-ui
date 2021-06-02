function toIntArray(v) {
  const ret = [];
  const version = v.split('.');

  for (let i = 0; i < version.length; i++) {
    ret.push(parseInt(version[i], 10));
  }

  return ret;
}

const calcScrollLeft = (windowWidth, tabWidth, current) => {
  let scrollInit = current * windowWidth * tabWidth;

  if (current <= 2) {
    scrollInit = 0;
  } else {
    scrollInit = (current - 2) * windowWidth * tabWidth;
  }

  return scrollInit;
};

export default {
  calcScrollLeft,
};
