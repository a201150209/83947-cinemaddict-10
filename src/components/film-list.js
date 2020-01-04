import {FilmListConfig} from '../main.js';
import Abstract from './abstract.js';


const currentFilmIndex = {
  general: 0,
  topRated: 0,
  mostCommented: 0
};

const getTitleHiddenClass = (isHidden) => {
  return isHidden ? FilmListConfig.Title.HIDDEN_CLASS_NAME : ``;
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


class FilmList extends Abstract {
  constructor(entity) {
    super();
    this._entity = entity;
    this._createTemplateFunc = createFilmListTemplate;
  }

  getContainerElement() {
    if (!this._containerElement) {
      this._containerElement = this._element.querySelector(FilmListConfig.Container.SELECTOR);
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
      const titleElement = this._element.querySelector(FilmListConfig.Title.SELECTOR);
      titleElement.textContent = FilmListConfig.General.Template.TITLE_NO_FILMS;
      titleElement.classList.remove(FilmListConfig.Title.HIDDEN_CLASS_NAME);
    }
  }
}

export {FilmList, getEntitiesForRender, getIsMaxFilms};
