import {renderElement, removeElementInClass, getElementInClass, hideElement, getTemplateInClass} from './utils.js';
import {FilmListConfig} from '../main.js';

const currentFilmIndex = {
  general: 0,
  topRated: 0,
  mostCommented: 0
};

const getTitleHiddenClass = (isHidden) => {
  if (isHidden) {
    return FilmListConfig.Title.HIDDEN_CLASS_NAME;
  }
  return ``;
}

const createFilmListTemplate = (entity) => {
  const classModificator = entity._classModificator;
  const title = entity._title;
  const hiddenClassName = getTitleHiddenClass(entity._isTitleHidden);
  return (
    `<section class="films-list${classModificator}">
        <h2 class="films-list__title ${hiddenClassName}">${title}</h2>
        <div class="films-list__container"></div>
      </section>`
  );
};

const getEntitiesForRender = (entites, config) => {
  let count;

  const isMaxLoad = currentFilmIndex[config.NAME] + config.Count.LOAD >= config.Count.MAX;

  if (isMaxLoad) {
    count = config.Count.MAX - currentFilmIndex[config.NAME];
  } else {
    count = config.Count.LOAD;
  }

  const start = currentFilmIndex[config.NAME];
  const end = currentFilmIndex[config.NAME] + count;
  const isSortProperty = entites[start] && entites[start][config.SORT_PROPERTY];

  if (!isSortProperty) {
    return [];
  }

  currentFilmIndex[config.NAME] += count;
  return entites.slice(start, end);

};

const getIsMaxFilms = () => {
  if (currentFilmIndex.general >= FilmListConfig.General.Count.MAX) {
    return true;
  }
  return false;
};


class FilmList {
  constructor(entity) {
    this._classModificator = entity.Template.CLASS_MODIFICATOR;
    this._title = entity.Template.TITLE;
    this._isTitleHidden = entity.Template.IS_TITLE_HIDDEN;
    this._films = [];
  }

  get element() {
    return this.getElement();
  }

  get containerElement() {
    return this.getContainerElement();
  }

  get films() {
    return this._films;
  }

  getTemplate() {
    return getTemplateInClass.call(this, createFilmListTemplate);
  }

  getElement() {
    return getElementInClass.call(this);
  }

  renderElement(parentElement) {
    renderElement(parentElement, this.getElement());
  }

  getContainerElement() {
    if (!this._containerElement) {
      this._containerElement = this._element.querySelector(FilmListConfig.Container.SELECTOR);
    }
    return this._containerElement;
  }

  removeElement(elementName) {
    return removeElementInClass.call(this, elementName);
  }

  hideEmptyElement() {
    if (this.films.length === 0) {
      hideElement(this._element);
    }
  }

  showNoData() {
    if (this.films.length === 0) {
      const titleElement = this._element.querySelector(FilmListConfig.Title.SELECTOR);
      titleElement.textContent = FilmListConfig.General.Template.TITLE_NO_FILMS;
      titleElement.classList.remove(FilmListConfig.Title.HIDDEN_CLASS_NAME);
    }
  }
}

export {FilmList, getEntitiesForRender, getIsMaxFilms};
