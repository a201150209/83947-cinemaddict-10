import {renderTemplate} from './utils.js';


const Raiting = {
  0: ``,
  10: `novice`,
  20: `fan`,
  Infinity: ` movie buff`
};
const raitingMap = new Map(Object.entries(Raiting));

const getRaiting = (filmsCount) => {
  let r;
  for (let key of raitingMap.keys()) {
    if (filmsCount <= key) {
      r = raitingMap.get(key);
      break;
    }
  }
  return r;
};

class User {
  constructor(raiting) {
    this.raiting = raiting;
  }
}

const createProfileTemplate = (statistic) => {
  const user = new User(getRaiting(statistic.watched));
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${user.raiting}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

const renderProfile = (parentElement, statistic) => {
  renderTemplate(parentElement, createProfileTemplate(statistic));
};

export {renderProfile};
