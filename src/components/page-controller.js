import {FilmList, getEntitiesForRender, getIsMaxFilms} from './film-list.js';
import {Film} from './film.js';
import {FilmDetail} from './film-detail.js';
import {ShowMoreButton} from './show-more-button.js';
import {Keycode, sortArrWithObjByKey, removeChildren} from './utils.js';
import {ClassName, FilmListConfig, mainElement} from '../main.js';
import {Sort} from './sort.js';


class PageController {
  constructor(container) {
    this._container = container;
  }

  render(filmEntites) {
    let currentFilmDetail = null;
    let newGeneralListConfig;

    const onFilmElementClick = (evt) => {
      evt.preventDefault();
      const element = evt.currentTarget;
      const currentEntity = filmEntites[element.dataset.id];
      const classes = [ClassName.FILM_POSTER, ClassName.FILM_TITLE, ClassName.FILM_COMMENT_COUNT]

      const isTargetElement = evt.target.classList.contains(classes.find((item) => {
        return evt.target.classList.contains(item);
      }));

      if (isTargetElement) {
        currentFilmDetail = new FilmDetail(currentEntity);
        currentFilmDetail.renderElement(document.body);
        currentFilmDetail.addClickHandlerOnElement(onFilmDetailElementClick);
        document.addEventListener(`keydown`, onDocumentKeydown);
      }
    };

    const onFilmDetailElementClick = (evt) => {
      evt.preventDefault();
      if (evt.target.classList.contains(ClassName.FILM_DETAIL_CLOSE_BUTTON)) {
        currentFilmDetail.removeElement();
        document.removeEventListener(`keydown`, onDocumentKeydown);
      }
    };

    const onDocumentKeydown = (evt) => {
      evt.preventDefault();
      if (evt.keyCode === Keycode.ESC) {
        currentFilmDetail.removeElement();
        document.removeEventListener(`keydown`, onDocumentKeydown);
      }
    };

    const onShowMoreButtonElementClick = (evt) => {
      evt.preventDefault();
      renderFilmsInList(newGeneralListConfig || FilmListConfig.General, generalFilmList);
      if (getIsMaxFilms()) {
        showMoreButton.removeElement();
      }
    };

    const onSortElementClick = (evt) => {
      if (evt.target.dataset.type && !evt.target.classList.contains(ClassName.SORT_ACTIVE_BUTTON)) {

        newGeneralListConfig = Object.assign({}, FilmListConfig.General);
        // Насколько правильно так переопределять константу и если так неправильно, то как сделать?
        newGeneralListConfig.SORT_PROPERTY = evt.target.dataset.type;

        removeChildren(generalFilmList.getContainerElement());
        renderFilms(newGeneralListConfig, generalFilmList, true);

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
    }

    const renderFilms = (config, filmList, isResetFilmIndex = false) => {
      const entities = sortArrWithObjByKey(filmEntites, config.SORT_PROPERTY);
      getEntitiesForRender(entities, config, isResetFilmIndex).forEach((item) => {
        const film = new Film(item);
        film.renderElement(filmList.getContainerElement());
        film.addClickHandlerOnElement(onFilmElementClick);
      });
    };

    const renderFilmsInList = (config, filmList) => {
      renderFilms(config, filmList);
      filmList.hideEmptyElement();
    };

    const sort = new Sort();
    sort.renderElement(mainElement, `afterbegin`);
    sort.addClickHandlerOnElement(onSortElementClick);

    if (filmEntites.length === 0) {
      const noDataFilmList = new FilmList(FilmListConfig.NoData);
      noDataFilmList.renderElement(this._container);
    }

    const generalFilmList = new FilmList(FilmListConfig.General);
    generalFilmList.renderElement(this._container);
    renderFilmsInList(FilmListConfig.General, generalFilmList);

    const topRatedFilmList = new FilmList(FilmListConfig.TopRated);
    topRatedFilmList.renderElement(this._container);
    renderFilmsInList(FilmListConfig.TopRated, topRatedFilmList);

    const mostCommentedFilmList = new FilmList(FilmListConfig.MostCommented);
    mostCommentedFilmList.renderElement(this._container);
    renderFilmsInList(FilmListConfig.MostCommented, mostCommentedFilmList);

    const showMoreButton = new ShowMoreButton();
    showMoreButton.renderElement(generalFilmList.getElement());
    showMoreButton.addClickHandlerOnElement(onShowMoreButtonElementClick);
  }
}

export default PageController;
