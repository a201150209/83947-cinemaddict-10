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

export const Keycode = {
  ESC: 27
};

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

export const renderElement = (parentElement, element, place = `beforeend`) => {
  parentElement.insertAdjacentElement(place, element);
};

export const renderTemplate = (parentElement, template, place = `beforeend`) => {
  parentElement.insertAdjacentHTML(place, template);
};

export const hideElement = (element) => {
  element.style.display = `none`;
};

export const sortArrWithObjByKey = (arr, key) => {
  return arr.slice().sort((prev, next) => {
    return next[key] - prev[key];
  });
};

export const createElementFromTemplate = (template) => {
  const wrapper = document.createElement(`div`);
  renderTemplate(wrapper, template);
  return wrapper.children[0];
};

export const getTemplateInClass = function (currentClass, func) {
  return func(currentClass);
};

export const getElementInClass = function (currentClass) {
  if (!currentClass._element) {
    currentClass._element = createElementFromTemplate(currentClass.getTemplate());
  }
  return currentClass._element;
};

export const removeElementInClass = (currentClass) => {
  currentClass._element.remove();
  currentClass._element = null;
};

export const removeChildren = (parentElement) => {
  while (parentElement.children[0]) {
    parentElement.children[0].remove();
  }
}
