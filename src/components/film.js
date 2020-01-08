import * as utils from './utils.js';
import Abstract from './abstract.js';

const DESCRIPTION_MAX_SYMBOLS = 140;

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

const getRandomFilmEntity = (id) => {
  const entity = {
    id,
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

export {Film, getRandomFilmEntity};

