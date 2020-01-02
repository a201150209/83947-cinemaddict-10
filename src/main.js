
import {Profile} from './components/profile.js';
import {Navigation} from './components/navigation.js';
import {Sort} from './components/sort.js';
import {FilmList, getEntitiesForRender} from './components/film-list.js';
import {Film, getRandomFilmEntity} from './components/film.js';
import {ShowMoreButton} from './components/show-more-button.js';
import {sortArrWithObjByKey} from './components/utils.js';

const SelectorElement = {
  HEADER: `.header`,
  MAIN: `.main`,
  CONTENT: `.films`,
  FILMS_COUNT: `.footer__statistics p`
};

const raitingMap = new Map(Object.entries({
  0: ``,
  10: `novice`,
  20: `fan`,
  Infinity: ` movie buff`
}));

const renderedFilms = [];

const FilmListConfig = {
  General: {
    Count: {
      MAX: 15,
      LOAD: 5
    },
    Template: {
      CLASS_MODIFICATOR: ``,
      TITLE: `All movies. Upcoming`,
      TITLE_NO_FILMS: `There are no movies in our database`,
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
  Title: {
    SELECTOR: `.films-list__title`,
    HIDDEN_CLASS_NAME: `visually-hidden`
  },
  Container: {
    SELECTOR: `.films-list__container`
  }
};

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
  let raiting;
  for (let key of raitingMap.keys()) {
    if (filmsCount <= key) {
      raiting = raitingMap.get(key);
      break;
    }
  }
  return raiting;
};


const filmEntites = new Array(FilmListConfig.General.Count.MAX).fill(``).map(() => {
  return getRandomFilmEntity();
});


const renderFilms = (config, filmList) => {
  const entities = sortArrWithObjByKey(filmEntites, config.SORT_PROPERTY);

  getEntitiesForRender(entities, config).forEach((item) => {
    const film = new Film(item);
    film.renderElement(filmList.getContainerElement());
    film.addClickHandlerOnElement();

    renderedFilms.push(film);
  });
};

const renderFilmsInGeneralList = () => {
  renderFilms(FilmListConfig.General, generalFilmList);
  generalFilmList.showNoData();
};

const renderFilmsInExtraList = (config, filmList) => {
  renderFilms(config, filmList);
  filmList.hideEmptyElement();
};

const headerElement = document.querySelector(SelectorElement.HEADER);
const mainElement = document.querySelector(SelectorElement.MAIN);
const contentElement = mainElement.querySelector(SelectorElement.CONTENT);

const statistic = getStatistic(filmEntites);
const profile = new Profile(getRaiting(statistic.watched));
profile.renderElement(headerElement);
const sort = new Sort();
sort.renderElement(mainElement);
const navigation = new Navigation(statistic);
navigation.renderElement(mainElement);


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
showMoreButton.renderElement(generalFilmList.element, renderedFilms);

const setFilmsCount = () => {
  const element = document.querySelector(SelectorElement.FILMS_COUNT);
  element.textContent = `${filmEntites.length} movies inside`;
};
setFilmsCount();

export {FilmListConfig, renderFilmsInGeneralList, renderedFilms};
