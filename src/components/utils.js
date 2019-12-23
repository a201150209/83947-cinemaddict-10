export const MonthNames = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `Jule`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`
];


export const getRandomNumber = (min, max, float = 0) => {
  let number = +((Math.random() * (max - min + 1)) + min).toFixed(float);

  if (number > max ||
    number < min ||
    float > 0 && Number.isInteger(number)) {
    number = getRandomNumber(max, min, float);
  }

  return number;
};

export const getRandomArrayElements = (array, count = 1) => {
  return new Array(count).fill(``).map(() => {
    return array[getRandomNumber(0, array.length - 1)];
  });
};

export const getRandomDate = (maxBackShift, maxFutureShift) => {
  const today = new Date().getDate();
  const shift = getRandomNumber(maxBackShift, maxFutureShift);
  const dueDate = new Date();
  dueDate.setDate(today + shift);
  return dueDate;
};

export const getTimeAsString = (date) => {
  return date.toLocaleTimeString(`ru-RU`, {hour: `numeric`, hour12: true, minute: `numeric`});
};

export const coinToss = () => {
  return (Math.floor(Math.random() * 2) === 0);
};

export const getRandomSet = (array, min = array.length - 1, max = min) => {
  const set = new Set();
  const qty = getRandomNumber(min, max);
  for (let i = 0; i <= qty; i++) {
    set.add(getRandomArrayElements(array));
  }

  return set;
};

export const createTemplateFromObj = (obj, func) => {
  let template = ``;

  const keys = Object.keys(obj);
  const values = Object.values(obj);

  for (let i = 0; i < keys.length; i++) {
    template += func(keys[i], values[i]) + `\n`;
  }
  return template;
};

export const createTemplateFromCollection = (collection, func) => {
  return Array.from(collection).map((item) => {
    if (Array.isArray(item)) {
      return func(item[0]);
    }

    return func(item);
  }).join(`\n`);
};

export const renderTemplate = (element, template, place = `beforeend`) => {
  element.insertAdjacentHTML(place, template);
};

export const hideElement = (element) => {
  element.style.display = `none`;
};

export const hideEmptyElement = (checked, hidden) => {
  if (checked.children.length === 0) {
    hideElement(hidden);
  }
};

export const sortArrWithObjByKey = (arr, key) => {
  return arr.slice().sort((prev, next) => {
    return next[key] - prev[key];
  });
};
