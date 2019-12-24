
import {renderProfile, getRaiting, User} from './components/profile.js';
import {getStatistic, renderMenu} from './components/menu.js';
import {renderFilmList} from './components/film-list.js';
import {renderFilms, Film, FilmConfig, getRandomFilmEntity, getEntitiesForRender} from './components/film.js';
import {renderLoadMoreButton} from './components/show-more-button.js';
import {hideEmptyElement, sortArrWithObjByKey} from './components/utils.js';

export const SelectorElement = {
  HEADER: `header.header`,
  MAIN: `main.main`,
  GENERAL: `.films-list`,
  TOP_RATED: `.films-list--extra.top-rated`,
  MOST_COMMENTED: `.films-list--extra.most-commented`,
  FILM_LIST: `.films-list__container`,
  SHOW_MORE_BUTTON: `.films-list__show-more`,
  FILMS_COUNT: `.footer__statistics p`
};

const filmEntites = new Array(FilmConfig.Main.Count.MAX).fill(``).map(() => {
  return new Film(getRandomFilmEntity());
});
const filmEntitesSortedByRaiting = sortArrWithObjByKey(filmEntites, FilmConfig.TopRated.SORT_PROPERTY);
const filmEntitesSortedByCommentCount = sortArrWithObjByKey(filmEntites, FilmConfig.MostCommented.SORT_PROPERTY);


const mainElement = document.querySelector(SelectorElement.MAIN);
const statistic = getStatistic(filmEntites);
renderMenu(mainElement, statistic);
renderFilmList(mainElement);

const generalBlockElement = document.querySelector(SelectorElement.GENERAL);
const mainFilmListElement = generalBlockElement.querySelector(SelectorElement.FILM_LIST);

const renderFilmsInMainList = () => {
  renderFilms(mainFilmListElement, getEntitiesForRender(filmEntites, FilmConfig.Main));
};

renderFilmsInMainList();

const topRatedBlockElement = document.querySelector(SelectorElement.TOP_RATED);
const topRatedFilmListElement = topRatedBlockElement.querySelector(SelectorElement.FILM_LIST);
renderFilms(topRatedFilmListElement, getEntitiesForRender(filmEntitesSortedByRaiting, FilmConfig.TopRated));
hideEmptyElement(topRatedFilmListElement, topRatedBlockElement);

const mostCommentedBlockElement = document.querySelector(SelectorElement.MOST_COMMENTED);
const mostCommentedFilmListElement = mostCommentedBlockElement.querySelector(SelectorElement.FILM_LIST);
renderFilms(mostCommentedFilmListElement, getEntitiesForRender(filmEntitesSortedByCommentCount, FilmConfig.MostCommented));
hideEmptyElement(mostCommentedFilmListElement, mostCommentedBlockElement);

const filmsListElement = mainElement.querySelector(SelectorElement.GENERAL);
renderLoadMoreButton(filmsListElement);

const setFilmsCount = () => {
  const element = document.querySelector(SelectorElement.FILMS_COUNT);
  element.textContent = `${filmEntites.length} movies inside`;
};
setFilmsCount();

const headerElement = document.querySelector(SelectorElement.HEADER);
const userEntity = new User(getRaiting(statistic.watched));
renderProfile(headerElement, userEntity);

export {renderFilmsInMainList};
