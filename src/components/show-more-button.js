import {renderTemplate, hideElement} from './utils.js';
import {renderFilmsInMainList, SelectorElement} from '../main.js';
import {getIsMaxFilms} from './film.js';

const createShowMoreButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

const onButtonElementClick = function (evt) {
  evt.preventDefault();
  renderFilmsInMainList();
  hideButtonIfNoMoreFilms(evt);
};

const hideButtonIfNoMoreFilms = (evt) => {
  if (getIsMaxFilms()) {
    hideElement(evt.target);
  }
};

export const renderLoadMoreButton = (parentElement) => {
  renderTemplate(parentElement, createShowMoreButtonTemplate());

  const buttonElement = parentElement.querySelector(SelectorElement.SHOW_MORE_BUTTON);
  buttonElement.addEventListener(`click`, onButtonElementClick);
};
