import FilmList from '../components/film-list.js';
import Sort from '../components/sort.js';
import FilmController from './film-controller.js';
import ShowMoreButton from '../components/show-more-button.js';
import {sortArrWithObjByKey, removeChildren} from '../components/utils.js';
import {ClassName, filmListConfig, mainElement} from '../main.js';


class PageController {
  constructor(container) {
    this._container = container;
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
      return config.currentIndex >= config.Count.MAX ? true : false;
    };

    const onShowMoreButtonElementClick = (evt) => {
      evt.preventDefault();
      renderFilmsInList(filmListConfig.General, generalFilmList);
      if (getIsMaxFilms(filmListConfig.General)) {
        showMoreButton.removeElement();
      }
    };

    const onSortElementClick = (evt) => {
      if (evt.target.dataset.type && !evt.target.classList.contains(ClassName.SORT_ACTIVE_BUTTON)) {

        filmListConfig.General.sortProperty = evt.target.dataset.type;
        removeChildren(generalFilmList.getContainerElement());
        renderFilms(filmListConfig.General, generalFilmList, true);
        changeActiveSorter(evt.target);

        if (!showMoreButton.element) {
          showMoreButton.renderElement(generalFilmList.getElement());
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
        const controller = new FilmController(filmList.getContainerElement(), this._onDataChange);
        controller.render(item);
      });
    }

    const renderFilmsInList = (config, filmList) => {
      renderFilms(config, filmList);
      filmList.hideEmptyElement();
    };


    const sort = new Sort();
    sort.renderElement(mainElement, `afterbegin`);
    sort.addClickHandlerOnElement(onSortElementClick);

    if (filmEntites.length === 0) {
      const noDataFilmList = new FilmList(filmListConfig.NoData);
      noDataFilmList.renderElement(this._container);
    }

    const generalFilmList = new FilmList(filmListConfig.General);
    generalFilmList.renderElement(this._container);
    renderFilmsInList(filmListConfig.General, generalFilmList);

    const topRatedFilmList = new FilmList(filmListConfig.TopRated);
    topRatedFilmList.renderElement(this._container);
    renderFilmsInList(filmListConfig.TopRated, topRatedFilmList);

    const mostCommentedFilmList = new FilmList(filmListConfig.MostCommented);
    mostCommentedFilmList.renderElement(this._container);
    renderFilmsInList(filmListConfig.MostCommented, mostCommentedFilmList);

    const showMoreButton = new ShowMoreButton();
    showMoreButton.renderElement(generalFilmList.getElement());
    showMoreButton.addClickHandlerOnElement(onShowMoreButtonElementClick);
  }

  _onDataChange(className, handler) {
    //debugger;
    /*const oldElement = this[className].getElement();
    this.render(this.entity);
    oldElement.insertAdjacentElement(`beforebegin`, this[className]._element);
    oldElement.remove();*/
    //console.log(this[className]._entity.isMarked)

    const oldElement = this[className].getElement();
    const parent = oldElement.parentElement;
    this[className].removeLinkToElement();
    const newElement = this[className].getElement();
    parent.replaceChild(newElement, oldElement);
    this[className].addClickHandlerOnElement(handler);
  }

}

export default PageController;
