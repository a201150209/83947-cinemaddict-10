import Film from '../components/film.js';
import FilmDetail from '../components/film-detail.js';
import {ClassName} from '../main.js';
import {Keycode, getTrueKeyInObject, removeChildren} from '../components/utils.js';

const EMOJI_WIDTH = 55;
const EMOJI_HEIGHT = 55;

class FilmController {
  constructor(containerElement, onViewChange) {
    this._containerElement = containerElement;
    this._onViewChange = onViewChange;
    this._film = null;
    this._filmDetail = null;
    this._entity = null;
  }

  render(entity) {
    const onFilmElementClick = (evt) => {
      evt.preventDefault();
      openFilmDetail(evt.target);
      changeDataInFilmElement(evt.target);
    };

    const onFilmDetailElementClick = (evt) => {
      closeFilmDetail(evt.target);
      changeControlsInDetailFilmElement(evt.target);
      changeRaiting(evt.target);
      selectEmoji(evt.target);
    };

    const onDocumentKeydown = (evt) => {
      if (evt.keyCode === Keycode.ESC) {
        this._filmDetail.removeElement();
        document.removeEventListener(`keydown`, onDocumentKeydown);
      }
    };

    const createFilm = () => {
      this._film = new Film(this._entity);
      this._film.renderElement(this._containerElement);
      this._film.addClickHandlerOnElement(onFilmElementClick);
    };

    const createDetailFilm = () => {
      this._filmDetail = new FilmDetail(this._entity);
      this._filmDetail.renderElement(document.body);
      this._filmDetail.addClickHandlerOnElement(onFilmDetailElementClick);
      document.addEventListener(`keydown`, onDocumentKeydown);
    };

    const openFilmDetail = (target) => {
      const targetClasses = [ClassName.FILM_POSTER, ClassName.FILM_TITLE, ClassName.FILM_COMMENT_COUNT];
      const isTargetClass = targetClasses.find((item) => {
        return target.classList.contains(item);
      });
      const isTargetClicked = target.classList.contains(isTargetClass);

      if (isTargetClicked) {
        this._onViewChange();
        createDetailFilm(this._entity);
      }
    };

    const closeFilmDetail = (element) => {
      if (element.classList.contains(ClassName.FILM_DETAIL_CLOSE_BUTTON)) {
        this._filmDetail.removeElement();
        document.removeEventListener(`keydown`, onDocumentKeydown);
      }
    };

    const changeDataInFilmElement = (element) => {
      const property = {
        isWatched: element.classList.contains(ClassName.MARK_AS_WATCHED_BUTTON_ON_FILM),
        isMarked: element.classList.contains(ClassName.ADD_TO_WATCHLIST_BUTTON_ON_FILM),
        isFavorite: element.classList.contains(ClassName.ADD_TO_FAVORITES_BUTTON_ON_FILM)
      };
      const changedProperty = getTrueKeyInObject(property);
      const isActive = element.classList.contains(ClassName.ACTIVE_BUTTON_ON_FILM);
      changeData(changedProperty, isActive, false);
    };

    const changeControlsInDetailFilmElement = (element) => {
      const property = {
        isWatched: element.classList.contains(ClassName.MARK_AS_WATCHED_BUTTON_ON_FILM_DETAIL),
        isMarked: element.classList.contains(ClassName.ADD_TO_WATCHLIST_BUTTON_ON_FILM_DETAIL),
        isFavorite: element.classList.contains(ClassName.ADD_TO_FAVORITES_BUTTON_ON_FILM_DETAIL)
      };
      const changedProperty = getTrueKeyInObject(property);
      const isActive = element.previousElementSibling && element.previousElementSibling.checked;
      changeData(changedProperty, isActive, true);
    };

    const changeData = (property, isActive, isFilmDetail) => {
      if (property) {
        this._entity[property] = !isActive;
        this._onDataChange(`_film`, onFilmElementClick);
        if (isFilmDetail) {
          this._onDataChange(`_filmDetail`, onFilmDetailElementClick);
        }
      }
    };

    const changeRaiting = (element) => {
      if (element.classList.contains(ClassName.RAITING_LABEL_ON_FILM_DETAIL)) {
        this._entity.userRaiting = Number(element.textContent);
        this._onDataChange(`_filmDetail`, onFilmDetailElementClick);
      }
    };

    const selectEmoji = (element) => {
      const iconElement = element;
      const parentElement = iconElement.parentElement;

      if (parentElement.classList.contains(ClassName.EMOJI_LABEL_ON_FILM_DETAIL)) {
        const wrapperElement = this._filmDetail.getElement().querySelector(`.${ClassName.EMOJI_CONTAINER_ON_FILM_DETAIL}`);
        removeChildren(wrapperElement);
        const clone = iconElement.cloneNode();
        clone.style.width = EMOJI_WIDTH + `px`;
        clone.style.height = EMOJI_HEIGHT + `px`;
        wrapperElement.insertAdjacentElement(`beforeend`, clone);
      }
    };

    this._entity = entity;
    createFilm();
  }

  setDefaultView() {
    if (this._filmDetail) {
      this._filmDetail.removeElement();
    }
  }

  _onDataChange(className, handler) {
    const oldElement = this[className].getElement();
    const parent = oldElement.parentElement;
    this[className].removeLinkToElement();
    const newElement = this[className].getElement();
    parent.replaceChild(newElement, oldElement);
    this[className].addClickHandlerOnElement(handler);
  }

}

export default FilmController;
