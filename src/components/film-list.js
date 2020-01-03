import {renderElement, removeElementInClass, getElementInClass, getTemplateInClass} from './utils.js';
import {FilmListConfig} from '../main.js';


const currentFilmIndex = {
  general: 0,
  topRated: 0,
  mostCommented: 0
};

const getTitleHiddenClass = (isHidden) => {
  return isHidden ? FilmListConfig.Title.HIDDEN_CLASS_NAME : ``;
};

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

  count = isMaxLoad ? config.Count.MAX - currentFilmIndex[config.NAME] : config.Count.LOAD;

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
  return currentFilmIndex.general >= FilmListConfig.General.Count.MAX ? true : false;
};


class FilmList {
  constructor(entity) {
    this._classModificator = entity.Template.CLASS_MODIFICATOR;
    this._title = entity.Template.TITLE;
    this._isTitleHidden = entity.Template.IS_TITLE_HIDDEN;
  }

  get element() {
    return this.getElement();
  }

  get containerElement() {
    return this.getContainerElement();
  }

  getTemplate() {
    return getTemplateInClass(this, createFilmListTemplate);
  }

  getElement() {
    return getElementInClass(this);
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

  removeElement() {
    removeElementInClass(this);
  }

  hideEmptyElement() {
    if (this.getContainerElement().children.length === 0) {
      this.removeElement();
    }
  }

  showNoData() {
    if (this.getContainerElement().children.length === 0) {
      const titleElement = this._element.querySelector(FilmListConfig.Title.SELECTOR);
      titleElement.textContent = FilmListConfig.General.Template.TITLE_NO_FILMS;
      titleElement.classList.remove(FilmListConfig.Title.HIDDEN_CLASS_NAME);
    }
  }
}

export {FilmList, getEntitiesForRender, getIsMaxFilms};
