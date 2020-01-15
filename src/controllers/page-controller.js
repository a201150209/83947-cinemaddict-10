import FilmList from '../components/film-list.js';
import Sort from '../components/sort.js';
import FilmController from './film-controller.js';
import ShowMoreButton from '../components/show-more-button.js';
import {sortArrWithObjByKey, removeChildren} from '../components/utils.js';
import {ClassName, filmListConfig, mainElement} from '../main.js';


class PageController {
  constructor(container) {
    this._container = container;
    this._filmControllers = [];
    this._generalFilmList = null;
    this._topRatedFilmList = null;
    this._mostCommentedFilmList = null;
    this._onViewChange = this._onViewChange.bind(this);
  }

  render(filmEntites) {
    const getEntitiesForRender = (entites, config, isResetIndex) => {
      if (isResetIndex) {
        config.currentIndex = 0;
      }

      const isMaxLoad = config.currentIndex + config.Count.LOAD >= config.Count.MAX;
      const count = isMaxLoad ? config.Count.MAX - config.currentIndex : config.Count.LOAD;

      const start = config.currentIndex;
      const end = config.currentIndex + count;
      const isSortProperty = entites[start] && entites[start][config.sortProperty || config.SORT_PROPERTY];

      if (!isSortProperty) {
        return [];
      }

      config.currentIndex += count;
      return entites.slice(start, end);
    };

    const getIsMaxFilms = (config) => {
      return config.currentIndex >= config.Count.MAX;
    };

    const onShowMoreButtonElementClick = (evt) => {
      evt.preventDefault();
      renderFilms(filmListConfig.General, this._generalFilmList);
      this._generalFilmList.hideEmptyElement();
      if (getIsMaxFilms(filmListConfig.General)) {
        showMoreButton.removeElement();
      }
    };

    const onSortElementClick = (evt) => {
      if (evt.target.dataset.type && !evt.target.classList.contains(ClassName.SORT_ACTIVE_BUTTON)) {

        filmListConfig.General.sortProperty = evt.target.dataset.type;
        removeChildren(this._generalFilmList.getContainerElement());
        renderFilms(filmListConfig.General, this._generalFilmList, true);
        changeActiveSorter(evt.target);

        if (!showMoreButton.element) {
          showMoreButton.renderElement(this._generalFilmList.getElement());
          showMoreButton.addClickHandlerOnElement(onShowMoreButtonElementClick);
        }
      }
    };

    const changeActiveSorter = (newElement) => {
      sort.getElement().querySelector(`.${ClassName.SORT_ACTIVE_BUTTON}`).classList.remove(ClassName.SORT_ACTIVE_BUTTON);
      newElement.classList.add(ClassName.SORT_ACTIVE_BUTTON);
    };

    const renderFilms = (config, filmList, isResetFilmIndex = false) => {
      const sortedEntities = sortArrWithObjByKey(filmEntites, config.sortProperty || config.SORT_PROPERTY);
      getEntitiesForRender(sortedEntities, config, isResetFilmIndex).forEach((item) => {
        const controller = new FilmController(filmList.getContainerElement(), this._onDataChange, this._onViewChange);
        controller.render(item);
        this._filmControllers.push(controller);
      });
    };

    const renderFilmListAndFilms = (config) => {
      const listName = `_` + config.NAME + `FilmList`;
      this[listName] = new FilmList(config);
      this[listName].renderElement(this._container);
      renderFilms(config, this[listName]);
      this[listName].hideEmptyElement();
    };

    const sort = new Sort();
    sort.renderElement(mainElement, `afterbegin`);
    sort.addClickHandlerOnElement(onSortElementClick);

    if (filmEntites.length === 0) {
      const noDataFilmList = new FilmList(filmListConfig.NoData);
      noDataFilmList.renderElement(this._container);
    }

    renderFilmListAndFilms(filmListConfig.General);
    renderFilmListAndFilms(filmListConfig.TopRated);
    renderFilmListAndFilms(filmListConfig.MostCommented);

    const showMoreButton = new ShowMoreButton();
    showMoreButton.renderElement(this._generalFilmList.getElement());
    showMoreButton.addClickHandlerOnElement(onShowMoreButtonElementClick);
  }

  _onDataChange(className, handler) {
    const oldElement = this[className].getElement();
    const parent = oldElement.parentElement;
    this[className].removeLinkToElement();
    const newElement = this[className].getElement();
    parent.replaceChild(newElement, oldElement);
    this[className].addClickHandlerOnElement(handler);
  }

  _onViewChange() {
    this._filmControllers.forEach((item) => {
      item.setDefaultView();
    });
  }

}

export default PageController;
