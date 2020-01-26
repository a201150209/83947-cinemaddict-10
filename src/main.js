
import Profile from './components/profile.js';
import PageController from './controllers/page-controller.js';
import Films from './models/films.js';
import {getRandomFilmEntity} from './mocks/film.js';

const ClassName = {
  HEADER: `header`,
  MAIN: `main`,
  CONTENT: `films`,
  FILMS_COUNT: `footer__statistics p`,
  FILM_POSTER: `film-card__poster`,
  FILM_TITLE: `film-card__title`,
  FILM_COMMENT_COUNT: `film-card__comments`,
  FILM_DETAIL_CLOSE_BUTTON: `film-details__close-btn`,
  SORT_ACTIVE_BUTTON: `sort__button--active`,
  ADD_TO_WATCHLIST_BUTTON_ON_FILM: `film-card__controls-item--add-to-watchlist`,
  MARK_AS_WATCHED_BUTTON_ON_FILM: `film-card__controls-item--mark-as-watched`,
  ADD_TO_FAVORITES_BUTTON_ON_FILM: `film-card__controls-item--favorite`,
  ADD_TO_WATCHLIST_BUTTON_ON_FILM_DETAIL: `film-details__control-label--watchlist`,
  MARK_AS_WATCHED_BUTTON_ON_FILM_DETAIL: `film-details__control-label--watched`,
  ADD_TO_FAVORITES_BUTTON_ON_FILM_DETAIL: `film-details__control-label--favorite`,
  ACTIVE_BUTTON_ON_FILM: `film-card__controls-item--active`,
  RAITING_LABEL_ON_FILM_DETAIL: `film-details__user-rating-label`,
  COMMENT_ON_FILM_DETAIL: `film-details__comment`,
  EMOJI_LIST_ON_FILM_DETAIL: `film-details__emoji-list`,
  EMOJI_ON_FILM_DETAIL: `film-details__emoji-item`,
  EMOJI_LABEL_ON_FILM_DETAIL: `film-details__emoji-label`,
  EMOJI_CONTAINER_ON_FILM_DETAIL: `film-details__add-emoji-label`,
  COMMENT_FIELD_ON_FILM_DETAIL: `film-details__comment-input`,
  REMOVE_COMMENT_BUTTON_ON_FILM_DETAIL: `film-details__comment-delete`,
  ACTIVE_FILTER: `main-navigation__item--active`,
  FILTER: `main-navigation__item`
};

const filmListConfig = {
  General: {
    Count: {
      MAX: 15,
      LOAD: 5,
      filtered: null
    },
    Template: {
      CLASS_MODIFICATOR: ``,
      TITLE: `All movies. Upcoming`,
      IS_TITLE_HIDDEN: true
    },
    NAME: `general`,
    sortProperty: `default`,
    currentIndex: 0
  },
  TopRated: {
    Count: {
      MAX: 2,
      LOAD: 2
    },
    Template: {
      CLASS_MODIFICATOR: `--extra`,
      TITLE: `Top rated`,
      IS_TITLE_HIDDEN: false
    },
    NAME: `topRated`,
    SORT_PROPERTY: `raiting`,
    currentIndex: 0,
  },
  MostCommented: {
    Count: {
      MAX: 2,
      LOAD: 2
    },
    Template: {
      CLASS_MODIFICATOR: `--extra`,
      TITLE: `Most commented`,
      IS_TITLE_HIDDEN: false
    },
    NAME: `mostCommented`,
    SORT_PROPERTY: `commentCount`,
    currentIndex: 0
  },
  NoData: {
    Template: {
      CLASS_MODIFICATOR: ``,
      TITLE: `There are no movies in our database`,
      IS_TITLE_HIDDEN: false
    },
    NAME: `noData`,
  },
  Title: {
    SELECTOR: `.films-list__title`,
    HIDDEN_CLASS_NAME: `visually-hidden`
  },
  Container: {
    SELECTOR: `.films-list__container`
  }
};

const filmEntites = new Array(filmListConfig.General.Count.MAX).fill(``).map((item, i) => {
  return getRandomFilmEntity(i);
});


const getRaiting = (filmsCount) => {
  const raitingMap = new Map(Object.entries({
    0: ``,
    10: `novice`,
    20: `fan`,
    Infinity: ` movie buff`
  }));

  let raiting;
  for (let key of raitingMap.keys()) {
    if (filmsCount <= key) {
      raiting = raitingMap.get(key);
      break;
    }
  }
  return raiting;
};

const headerElement = document.querySelector(`.${ClassName.HEADER}`);
const mainElement = document.querySelector(`.${ClassName.MAIN}`);
const contentElement = mainElement.querySelector(`.${ClassName.CONTENT}`);

const films = new Films(filmEntites);
const statistic = films.getStatistic();
const profile = new Profile(getRaiting(statistic.watched));
profile.renderElement(headerElement);

const pageController = new PageController(contentElement, films);
pageController.render(statistic);


const setFilmsCount = () => {
  const element = document.querySelector(`.${ClassName.FILMS_COUNT}`);
  element.textContent = `${filmEntites.length} movies inside`;
};
setFilmsCount();


export {filmListConfig, ClassName, mainElement, filmEntites};
