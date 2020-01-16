import {filmListConfig} from '../main.js';
import Abstract from './abstract.js';

const getTitleHiddenClass = (isHidden) => {
  return isHidden ? filmListConfig.Title.HIDDEN_CLASS_NAME : ``;
};

const createFilmListTemplate = (entity) => {
  const classModificator = entity.Template.CLASS_MODIFICATOR;
  const title = entity.Template.TITLE;
  const hiddenClassName = getTitleHiddenClass(entity.Template.IS_TITLE_HIDDEN);
  return (
    `<section class="films-list${classModificator}">
        <h2 class="films-list__title ${hiddenClassName}">${title}</h2>
        <div class="films-list__container"></div>
      </section>`
  );
};


class FilmList extends Abstract {
  constructor(entity) {
    super();
    this._entity = entity;
    this._createTemplateFunc = createFilmListTemplate;
  }

  getContainerElement() {
    if (!this._containerElement) {
      this._containerElement = this._element.querySelector(filmListConfig.Container.SELECTOR);
    }
    return this._containerElement;
  }

  hideEmptyElement() {
    if (this.getContainerElement().children.length === 0) {
      this.removeElement();
    }
  }

  showNoData() {
    if (this.getContainerElement().children.length === 0) {
      const titleElement = this._element.querySelector(filmListConfig.Title.SELECTOR);
      titleElement.textContent = filmListConfig.General.Template.TITLE_NO_FILMS;
      titleElement.classList.remove(filmListConfig.Title.HIDDEN_CLASS_NAME);
    }
  }
}

export default FilmList;
