
import {Profile} from './components/profile.js';
import Navigation from './components/navigation.js';
import {getRandomFilmEntity} from './components/film.js';
import PageController from './components/page-controller.js';

const ClassName = {
  HEADER: `header`,
  MAIN: `main`,
  CONTENT: `films`,
  FILMS_COUNT: `footer__statistics p`,
  FILM_POSTER: `film-card__poster`,
  FILM_TITLE: `film-card__title`,
  FILM_COMMENT_COUNT: `film-card__comments`,
  FILM_DETAIL_CLOSE_BUTTON: `film-details__close-btn`,
  SORT_ACTIVE_BUTTON: `sort__button--active`
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

const headerElement = document.querySelector(`.${ClassName.HEADER}`);
const mainElement = document.querySelector(`.${ClassName.MAIN}`);
const contentElement = mainElement.querySelector(`.${ClassName.CONTENT}`);

const statistic = getStatistic(filmEntites);
const profile = new Profile(getRaiting(statistic.watched));
profile.renderElement(headerElement);

const pageController = new PageController(contentElement);
pageController.render(filmEntites);

const navigation = new Navigation(statistic);
navigation.renderElement(mainElement, `afterbegin`);


const setFilmsCount = () => {
  const element = document.querySelector(`.${ClassName.FILMS_COUNT}`);
  element.textContent = `${filmEntites.length} movies inside`;
};
setFilmsCount();

export {FilmListConfig, ClassName, mainElement};
