
import {Profile} from './components/profile.js';
import {Navigation} from './components/navigation.js';
import {Sort} from './components/sort.js';
import {FilmList, getEntitiesForRender, getIsMaxFilms} from './components/film-list.js';
import {Film, getRandomFilmEntity} from './components/film.js';
import {FilmDetail} from './components/film-detail.js';
import {ShowMoreButton} from './components/show-more-button.js';
import {Keycode, sortArrWithObjByKey} from './components/utils.js';

const ClassName = {
  HEADER: `header`,
  MAIN: `main`,
  CONTENT: `films`,
  FILMS_COUNT: `footer__statistics p`,
  FILM_POSTER: `film-card__poster`,
  FILM_TITLE: `film-card__title`,
  FILM_COMMENT_COUNT: `film-card__comments`,
  FILM_DETAIL_CLOSE_BUTTON: `film-details__close-btn`
};

const FilmListConfig = {
  General: {
    Count: {
      MAX: 15,
      LOAD: 5
    },
    Template: {
      CLASS_MODIFICATOR: ``,
      TITLE: `All movies. Upcoming`,
      IS_TITLE_HIDDEN: true
    },
    NAME: `general`,
    SORT_PROPERTY: `title`
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
    SORT_PROPERTY: `raiting`
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
    SORT_PROPERTY: `commentCount`
  },
  NoData: {
    Template: {
      CLASS_MODIFICATOR: ``,
      TITLE: `There are no movies in our database`,
      IS_TITLE_HIDDEN: false
    },
    NAME: `general`,
    SORT_PROPERTY: `title`
  },
  Title: {
    SELECTOR: `.films-list__title`,
    HIDDEN_CLASS_NAME: `visually-hidden`
  },
  Container: {
    SELECTOR: `.films-list__container`
  }
};

let currentFilmDetail = null;

const filmEntites = new Array(FilmListConfig.General.Count.MAX).fill(``).map((item, i) => {
  return getRandomFilmEntity(i);
});

const getStatistic = (entites) => {
  const statistic = {
    favorited: 0,
    watched: 0,
    marked: 0
  };

  entites.forEach((item) => {
    if (item.isFavorite) {
      statistic.favorited++;
    }

    if (item.isWatched) {
      statistic.watched++;
    }

    if (item.isMarked) {
      statistic.marked++;
    }
  });

  return statistic;
};

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

const onFilmElementClick = (evt) => {
  evt.preventDefault();
  const element = evt.currentTarget;
  const currentEntity = filmEntites[element.dataset.id];
  console.log(evt.target.classList.contains(ClassName.FILM_POSTER || ClassName.FILM_TITLE || ClassName.FILM_COMMENT_COUNT))

  if (evt.target.classList.contains(ClassName.FILM_TITLE || ClassName.FILM_COMMENT_COUNT)) {

    currentFilmDetail = new FilmDetail(currentEntity);
    currentFilmDetail.renderElement(document.body);
    currentFilmDetail.addClickHandlerOnElement(onFilmDetailElementClick);
    document.addEventListener(`keydown`, onDocumentKeydown);
  }
};

const onFilmDetailElementClick = (evt) => {
  evt.preventDefault();
  if (evt.target.classList.contains(ClassName.FILM_DETAIL_CLOSE_BUTTON)) {
    currentFilmDetail.removeElement();
    document.removeEventListener(`keydown`, onDocumentKeydown);
  }
};

const onShowMoreButtonElementClick = (evt) => {
  evt.preventDefault();
  renderFilmsInGeneralList();
  if (getIsMaxFilms()) {
    showMoreButton.removeElement();
  }
};

const onDocumentKeydown = (evt) => {
  evt.preventDefault();
  if (evt.keyCode === Keycode.ESC) {
    currentFilmDetail.removeElement();
    document.removeEventListener(`keydown`, onDocumentKeydown);
  }
};

const renderFilms = (config, filmList) => {
  const entities = sortArrWithObjByKey(filmEntites, config.SORT_PROPERTY);

  getEntitiesForRender(entities, config).forEach((item) => {
    const film = new Film(item);
    film.renderElement(filmList.getContainerElement());
    film.addClickHandlerOnElement(onFilmElementClick);
  });
};

const renderFilmsInGeneralList = () => {
  renderFilms(FilmListConfig.General, generalFilmList);
  generalFilmList.hideEmptyElement();
};

const renderFilmsInExtraList = (config, filmList) => {
  renderFilms(config, filmList);
  filmList.hideEmptyElement();
};

const headerElement = document.querySelector(`.${ClassName.HEADER}`);
const mainElement = document.querySelector(`.${ClassName.MAIN}`);
const contentElement = mainElement.querySelector(`.${ClassName.CONTENT}`);

const statistic = getStatistic(filmEntites);
const profile = new Profile(getRaiting(statistic.watched));
profile.renderElement(headerElement);
const sort = new Sort();
sort.renderElement(mainElement, `afterbegin`);
const navigation = new Navigation(statistic);
navigation.renderElement(mainElement, `afterbegin`);

if (filmEntites.length === 0) {
  const noDataFilmList = new FilmList(FilmListConfig.NoData);
  noDataFilmList.renderElement(contentElement);
}

const generalFilmList = new FilmList(FilmListConfig.General);
generalFilmList.renderElement(contentElement);
renderFilmsInGeneralList();

const topRatedFilmList = new FilmList(FilmListConfig.TopRated);
topRatedFilmList.renderElement(contentElement);
renderFilmsInExtraList(FilmListConfig.TopRated, topRatedFilmList);

const mostCommentedFilmList = new FilmList(FilmListConfig.MostCommented);
mostCommentedFilmList.renderElement(contentElement);
renderFilmsInExtraList(FilmListConfig.MostCommented, mostCommentedFilmList);

const showMoreButton = new ShowMoreButton();
showMoreButton.renderElement(generalFilmList.getElement());
showMoreButton.addClickHandlerOnElement(onShowMoreButtonElementClick);

const setFilmsCount = () => {
  const element = document.querySelector(`.${ClassName.FILMS_COUNT}`);
  element.textContent = `${filmEntites.length} movies inside`;
};
setFilmsCount();

export {FilmListConfig, renderFilmsInGeneralList};
