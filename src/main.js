
import {renderProfile} from './components/profile.js';
import {renderMenu} from './components/menu.js';
import {renderFilmList} from './components/film-list.js';
import {renderFilms, filmEntites} from './components/film.js';
import {renderLoadMoreButton} from './components/show-more-button.js';
import {hideEmptyElement} from './components/utils.js';

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


export const mainElement = document.querySelector(SelectorElement.MAIN);
renderMenu();
renderFilmList();

const generalBlockElement = document.querySelector(SelectorElement.GENERAL);
export const mainFilmListElement = generalBlockElement.querySelector(SelectorElement.FILM_LIST);
renderFilms();

const topRatedBlockElement = document.querySelector(SelectorElement.TOP_RATED);
export const topRatedFilmListElement = topRatedBlockElement.querySelector(SelectorElement.FILM_LIST);
renderFilms(topRatedFilmListElement);
hideEmptyElement(topRatedFilmListElement, topRatedBlockElement);

const mostCommentedBlockElement = document.querySelector(SelectorElement.MOST_COMMENTED);
export const mostCommentedFilmListElement = mostCommentedBlockElement.querySelector(SelectorElement.FILM_LIST);
renderFilms(mostCommentedFilmListElement);
hideEmptyElement(mostCommentedFilmListElement, mostCommentedBlockElement);


const filmsListElement = mainElement.querySelector(SelectorElement.GENERAL);
renderLoadMoreButton(filmsListElement);


const setFilmsCount = () => {
  const element = document.querySelector(SelectorElement.FILMS_COUNT);
  element.textContent = `${filmEntites.length} movies inside`;
};

setFilmsCount();

export const headerElement = document.querySelector(SelectorElement.HEADER);
renderProfile();
