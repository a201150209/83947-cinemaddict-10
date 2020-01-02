import {renderElement, hideElement, getElementInClass, getTemplateInClass, removeElementInClass} from './utils.js';
import {renderFilmsInGeneralList} from '../main.js';
import {getIsMaxFilms} from './film-list.js';


const onButtonElementClick = function (evt) {
  evt.preventDefault();
  renderFilmsInGeneralList();
  hideButtonIfNoMoreFilms(evt);
};

const hideButtonIfNoMoreFilms = (evt) => {
  if (getIsMaxFilms()) {
    hideElement(evt.target);
  }
};

const createShowMoreButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

class ShowMoreButton {
  getTemplate() {
    return getTemplateInClass.call(this, createShowMoreButtonTemplate);
  }

  getElement() {
    return getElementInClass.call(this);
  }

  renderElement(parentElement, renderedFilms) {
    if (renderedFilms.length) {
      renderElement(parentElement, this.getElement());
      this._element.addEventListener(`click`, onButtonElementClick);
    }
  }

  removeElement() {
    this._element.remove();
    this._element = null;
  }
}

export {ShowMoreButton};
