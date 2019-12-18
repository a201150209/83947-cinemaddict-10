import * as utils from './utils.js';
import {createFilmDetailTemplate} from './film-detail.js';
import {mainFilmListElement, topRatedFilmListElement, mostCommentedFilmListElement, mainElement} from '../main.js';

const mockText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const mockWords = mockText.split(` `);
const mockSentences = mockText.split(`.`);
const posterNames = [`made-for-each-other`, `popeye-meets-sinbad`, `sagebrush-trail`, `santa-claus-conquers-the-martians`, `the-dance-of-life`, `the-great-flamarion`, `the-man-with-the-golden-arm`];
const filmGenres = [`Action`, `Adventure`, `Crime`, `Drama`, `Epic`];
const firstNames = [`Mark`, `Petr`, `Juno`, `Planeta Nibiru`, `Keks`, `Vasiliy`, `Audrey`];
const lastNames = [`Kim`, `Kam`, `Kom`, `Abartvoog`, `Ooogdvv`, `International`];
const countryNames = [`USA`, `USSR`, `Germany`, `UK`];
const commentIconNames = [`smile`, `sleeping`, `puke`, `angry`];

export const FilmConfig = {
  Count: {
    MAX: 15,
    Load: {
      MAIN: 5,
      TOP_RATED: 2,
      MOST_COMMENTED: 2
    }
  }
};

export const currentFilmIndex = {
  main: 0,
  topRated: 0,
  mostCommented: 0
};


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
  } else if (count > 1) {
    return `${count} comment`;
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


const createFilmTemplate = (entity) => {
  const DESCRIPTION_MAX_SYMBOLS = 140;
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
    `<article class="film-card">
      <h3 class="film-card__title">${entity.name}</h3>
      <p class="film-card__rating">${raiting}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="./images/posters/${entity.posterName}.jpg" alt="" class="film-card__poster">
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

const getActiveClass = (condition) => {
  if (condition) {
    return `film-card__controls-item--active`;
  }
  return ``;
};

class Film {
  constructor() {
    this.name = utils.getRandomArrayElements(mockWords, 5).join(` `);
    this.originalName = utils.getRandomArrayElements(mockWords, 5).join(` `);
    this.directorName = getPersonNames().toString();
    this.writerNames = getPersonNames(utils.getRandomNumber(1, 5));
    this.actorNames = getPersonNames(utils.getRandomNumber(1, 5));
    this.posterName = utils.getRandomArrayElements(posterNames).toString();
    this.description = utils.getRandomArrayElements(mockSentences, utils.getRandomNumber(1, 3)).toString();
    this.raiting = utils.getRandomNumber(0, 10, 1);
    this.releaseDate = utils.getRandomDate(-50, 0);
    this.duration = getDurationEntity();
    this.genres = utils.getRandomArrayElements(filmGenres, 3);
    this.commentCount = utils.getRandomNumber(2, 7);
    this.ageLimit = utils.getRandomNumber(0, 18);
    this.countryName = utils.getRandomArrayElements(countryNames).toString();
    this.comments = getCommentEntities(this.commentCount);
    this.isWatched = utils.coinToss();
    this.isFavorite = utils.coinToss();
    this.isMarked = utils.coinToss();
  }
}

export const filmEntites = new Array(FilmConfig.Count.MAX).fill(``).map(() => {
  return new Film();
});


export const renderFilms = (parentElement = mainFilmListElement) => {
  let indexName;
  let loadConfigName;
  let entities;
  let property;

  switch (parentElement) {
    case mainFilmListElement || mainElement:
      indexName = `main`;
      loadConfigName = `MAIN`;
      entities = filmEntites;
      property = `name`;
      break;
    case topRatedFilmListElement:
      indexName = `topRated`;
      loadConfigName = `TOP_RATED`;
      property = `raiting`;
      entities = filmEntites.slice().sort((prev, next) => {
        return next.raiting - prev.raiting;
      });
      break;
    case mostCommentedFilmListElement:
      indexName = `mostCommented`;
      loadConfigName = `MOST_COMMENTED`;
      property = `commentCount`;
      entities = filmEntites.slice().sort((prev, next) => {
        return next.commentCount - prev.commentCount;
      });
      break;
  }

  for (let i = 0; currentFilmIndex[indexName] < entities.length; currentFilmIndex[indexName]++) {
    if (i === 0 && !entities[i][property]) {
      break;
    }

    if (i >= FilmConfig.Count.Load[loadConfigName]) {
      break;
    }

    utils.renderTemplate(parentElement, createFilmTemplate(entities[currentFilmIndex[indexName]]));
    utils.renderTemplate(parentElement, createFilmDetailTemplate(entities[currentFilmIndex[indexName]]));
    i++;
  }
};


