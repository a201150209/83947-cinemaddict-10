import Abstract from './abstract.js';
import {ClassName} from '../main.js';

const DESCRIPTION_MAX_SYMBOLS = 140;

const getDuration = (entity) => {
  let hour = ``;

  if (entity.hour) {
    hour = `${entity.hour}h `;
  }

  return hour + `${entity.minut}m`;
};

const getCommentCount = (count) => {
  if (!count) {
    return `0 comment`;
  } else if (count === 1) {
    return `1 comment`;
  }
  return `${count} comments`;
};

const getRaiting = (raiting) => {
  return !raiting ? 0 : raiting;
};

const getActiveClass = (condition) => {
  return condition ? ClassName.ACTIVE_BUTTON_ON_FILM : ``;
};

const createFilmTemplate = (entity) => {
  const id = entity.id;
  const title = entity.title;
  const posterName = entity.posterName;
  const year = `${entity.releaseDate.getFullYear()}`;
  const duration = getDuration(entity.duration);
  const [genre] = entity.genres;
  const commentCount = getCommentCount(entity.commentCount);
  const description = entity.description.substr(0, DESCRIPTION_MAX_SYMBOLS);
  const raiting = getRaiting(entity.raiting);
  const isWatched = getActiveClass(entity.isWatched);
  const isFavorite = getActiveClass(entity.isFavorite);
  const isMarked = getActiveClass(entity.isMarked);

  return (
    `<article class="film-card" data-id="${id}">
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

class Film extends Abstract {
  constructor(entity) {
    super();
    this._entity = entity;
    this._createTemplateFunc = createFilmTemplate;
  }
}

export default Film;

