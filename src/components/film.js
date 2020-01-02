import * as utils from './utils.js';
import {FilmDetail} from './film-detail.js';
import {renderedFilms} from '../main.js';

const SelectorElement = {
  POSTER: `.film-card__poster`,
  TITLE: `.film-card__title`,
  COMMENT_COUNT: `.film-card__comments`
};

const mockText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const mockWords = mockText.split(` `);
const mockSentences = mockText.split(`.`);
const posterNames = [`made-for-each-other`, `popeye-meets-sinbad`, `sagebrush-trail`, `santa-claus-conquers-the-martians`, `the-dance-of-life`, `the-great-flamarion`, `the-man-with-the-golden-arm`];
const filmGenres = [`Action`, `Adventure`, `Crime`, `Drama`, `Epic`];
const firstNames = [`Mark`, `Petr`, `Juno`, `Planeta Nibiru`, `Keks`, `Vasiliy`, `Audrey`];
const lastNames = [`Kim`, `Kam`, `Kom`, `Abartvoog`, `Ooogdvv`, `International`];
const countryNames = [`USA`, `USSR`, `Germany`, `UK`];
const commentIconNames = [`smile`, `sleeping`, `puke`, `angry`];

const getDuration = (entity) => {
  let hour = ``;

  if (entity.hour) {
    hour = `${entity.hour}h `;
  }

  return hour + `${entity.minut}m`;
};

const getDurationEntity = () => {
  return {
    hour: utils.getRandomNumber(0, 2),
    minut: utils.getRandomNumber(0, 60)
  };
};

const getCommentCount = (count) => {
  if (!count) {
    return `0 comment`;
  } else if (count === 1) {
    return `1 comment`;
  }
  return `${count} comments`;
};

const getPersonNames = (count = 1) => {
  return new Array(count).fill(``).map(() => {
    const firstName = utils.getRandomArrayElements(firstNames);
    const lastName = utils.getRandomArrayElements(lastNames);
    return `${firstName} ${lastName}`;
  });
};

const getCommentEntities = (count) => {
  const comments = new Array(count).fill(``).map(() => {
    return {
      icon: utils.getRandomArrayElements(commentIconNames).toString(),
      text: utils.getRandomArrayElements(mockSentences, 2).join(` `),
      author: getPersonNames().toString(),
      date: utils.getRandomDate(-15, 0)
    };
  });
  return utils.getRandomSet(comments);
};

const getRaiting = (raiting) => {
  if (!raiting) {
    return 0;
  }
  return raiting;
};

const getActiveClass = (condition) => {
  if (condition) {
    return `film-card__controls-item--active`;
  }
  return ``;
};

const getRandomFilmEntity = () => {
  const entity = {
    title: utils.getRandomArrayElements(mockWords, 5).join(` `),
    originalTitle: utils.getRandomArrayElements(mockWords, 5).join(` `),
    directorName: getPersonNames().toString(),
    writerNames: getPersonNames(utils.getRandomNumber(1, 5)),
    actorNames: getPersonNames(utils.getRandomNumber(1, 5)),
    posterName: utils.getRandomArrayElements(posterNames).toString(),
    description: utils.getRandomArrayElements(mockSentences, utils.getRandomNumber(1, 3)).toString(),
    raiting: utils.getRandomNumber(0, 10, 1),
    releaseDate: utils.getRandomDate(-50, 0),
    duration: getDurationEntity(),
    genres: utils.getRandomArrayElements(filmGenres, 3),
    commentCount: utils.getRandomNumber(2, 7),
    ageLimit: utils.getRandomNumber(0, 18),
    countryName: utils.getRandomArrayElements(countryNames).toString(),
    isWatched: utils.coinToss(),
    isFavorite: utils.coinToss(),
    isMarked: utils.coinToss()
  };
  entity.comments = getCommentEntities(entity.commentCount);
  return entity;
};

const onElementClick = function (evt) {
  evt.preventDefault();
  const element = evt.currentTarget;
  const currentClass = renderedFilms.find((item) => {
    return item.element === element;
  });

  if (evt.target === currentClass.posterElement || currentClass.titleElement || currentClass.commentCountElement) {
    const filmDetail = new FilmDetail(currentClass.entity);
    filmDetail.renderElement();
  }
};

const createFilmTemplate = (entity) => {
  const DESCRIPTION_MAX_SYMBOLS = 140;
  const title = entity._title;
  const posterName = entity._posterName;
  const year = `${entity._releaseDate.getFullYear()}`;
  const duration = getDuration(entity._duration);
  const [genre] = entity._genres;
  const commentCount = getCommentCount(entity._commentCount);
  const description = entity._description.substr(0, DESCRIPTION_MAX_SYMBOLS);
  const raiting = getRaiting(entity._raiting);
  const isWatched = getActiveClass(entity._isWatched);
  const isFavorite = getActiveClass(entity._isFavorite);
  const isMarked = getActiveClass(entity._isMarked);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${raiting}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="./images/posters/${posterName}.jpg" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${commentCount}</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isMarked}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched  ${isWatched}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite  ${isFavorite}">Mark as favorite</button>
      </form>
    </article>`
  );
};

class Film {
  constructor(entity) {
    this._entity = entity;
    this._title = entity.title;
    this._posterName = entity.posterName;
    this._description = entity.description;
    this._raiting = entity.raiting;
    this._releaseDate = entity.releaseDate;
    this._duration = entity.duration;
    this._genres = entity.genres;
    this._commentCount = entity.commentCount;
    this._isWatched = entity.isWatched;
    this._isFavorite = entity.isFavorite;
    this._isMarked = entity.isMarked;
  }

  getTemplate() {
    return utils.getTemplateInClass.call(this, createFilmTemplate);
  }

  getElement() {
    return utils.getElementInClass.call(this);
  }

  renderElement(parentElement) {
    utils.renderElement(parentElement, this.getElement());
  }

  removeElement(elementName = `_element`) {
    this[elementName].remove();
    return utils.removeElementInClass.call(this, elementName);
  }

  get entity() {
    return this._entity;
  }

  get element() {
    return this._element;
  }

  get posterElement() {
    return this._element.querySelector(SelectorElement.POSTER);
  }

  get titleElement() {
    return this._element.querySelector(SelectorElement.TITLE);
  }

  get commentCountElement() {
    return this._element.querySelector(SelectorElement.COMMENT_COUNT);
  }

  addClickHandlerOnElement() {
    this._element.addEventListener(`click`, onElementClick);
  }
}

export {Film, getRandomFilmEntity};

