import {renderTemplate} from './utils.js';
import {headerElement} from '../main.js';
import {statistic} from './menu.js';

const getRaiting = (filmsCount) => {
  let raiting;
  const raitingMap = new Map([
    [5, `Newcomer`],
    [10, `Cinoman`],
    [15, `Oldfag`]
  ]);

  for (let key of raitingMap.keys()) {
    if (filmsCount <= key) {
      raiting = raitingMap.get(key);
      break;
    }
  }

  return raiting;
};


class User {
  constructor() {
    this.raiting = getRaiting(statistic.watched);
  }
}

const createProfileTemplate = () => {
  const user = new User();
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${user.raiting}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export const renderProfile = () => {
  renderTemplate(headerElement, createProfileTemplate());
};
