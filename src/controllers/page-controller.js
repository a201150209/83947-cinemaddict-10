import FilmList from '../components/film-list.js';
import SortController from './sort-controller.js';
import FiltersController from './filter-controller.js';
import FilmController from './film-controller.js';
import ShowMoreButtonController from './show-more-button-controller.js';
import {removeChildren} from '../components/utils.js';
import {filmListConfig, mainElement} from '../main.js';


class PageController {
  constructor(container, films) {
    this._container = container;
    this._films = films;
    this._filtersController = null;
    this._sortController = null;
    this._filmControllers = [];
    this._showMoreButtonController = null;
    this._generalFilmList = null;
    this._topRatedFilmList = null;
    this._mostCommentedFilmList = null;
    this._renderFilms = this._renderFilms.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSortChange = this._onSortChange.bind(this);
    this._onStatisticDataChange = this._films.onStatisticDataChange;
  }

  render(statistic) {
    if (this._films.getEntities().length === 0) {
      const noDataFilmList = new FilmList(filmListConfig.NoData);
      noDataFilmList.renderElement(this._container);
    }

    this._renderFilmListAndFilms(filmListConfig.General);
    this._renderFilmListAndFilms(filmListConfig.TopRated);
    this._renderFilmListAndFilms(filmListConfig.MostCommented);

    this._sortController = new SortController(mainElement, this._films, this._onSortChange);
    this._sortController.render();

    this._filtersController = new FiltersController(mainElement, this._films, this._onFilterChange);
    this._filtersController.render(statistic);
    this._films.setViewUpdater(`_updateFilters`, this._filtersController.rerender)

    this._showMoreButtonController = new ShowMoreButtonController(this._generalFilmList, this._renderFilms);
    this._showMoreButtonController.render();
  }

  _getEntitiesForRender(entites, config) {
    const isMaxLoad = config.currentIndex + config.Count.LOAD >= config.Count.MAX;
    const count = isMaxLoad ? config.Count.MAX - config.currentIndex : config.Count.LOAD;

    const start = config.currentIndex;
    const end = config.currentIndex + count;
    config.currentIndex += count;

    return entites.slice(start, end);
  }

  _renderFilmListAndFilms(config) {
    const listName = `_` + config.NAME + `FilmList`;
    this[listName] = new FilmList(config);
    this[listName].renderElement(this._container);
    this._renderFilms(config, this[listName]);
    this[listName].hideEmptyElement();
  }

  _renderFilms(config, filmList) {
    const entities = this._films.getEntities();
    this._getEntitiesForRender(entities, config).forEach((item) => {
      const controller = new FilmController(this._onViewChange, this._onStatisticDataChange);
      controller.render(item, filmList.getContainerElement());
      this._filmControllers.push(controller);
    });
  }

  _resetFilmIndex(config) {
    config.currentIndex = 0;
  }

  _onViewChange() {
    this._filmControllers.forEach((item) => {
      item.setDefaultView();
    });
  }

  _rerender() {
    removeChildren(this._generalFilmList.getContainerElement());
    this._showMoreButtonController.getButton().removeElement();
    this._resetFilmIndex(filmListConfig.General);
    this._renderFilms(filmListConfig.General, this._generalFilmList);
    this._showMoreButtonController.renderElement();
  }

  _onFilterChange() {
    this._rerender();
    this._filtersController.changeActiveElement();
  }

  _onSortChange() {
    this._rerender();
    this._sortController.changeActiveElement();
  }

}

export default PageController;
