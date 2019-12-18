import {renderTemplate, hideElement} from './utils.js';
import {SelectorElement} from '../main.js';
import {renderFilms, FilmConfig, currentFilmIndex} from './film.js';

const createShowMoreButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

const onButtonElementClick = function (evt) {
  evt.preventDefault();
  renderFilms();
  hideButtonIfNoMoreFilms(evt);
};

const hideButtonIfNoMoreFilms = (evt) => {
  if (currentFilmIndex.main >= FilmConfig.Count.MAX) {
    hideElement(evt.target);
  }
};

export const renderLoadMoreButton = (parentElement) => {
  renderTemplate(parentElement, createShowMoreButtonTemplate());

  const buttonElement = parentElement.querySelector(SelectorElement.SHOW_MORE_BUTTON);
  buttonElement.addEventListener(`click`, onButtonElementClick);
};
