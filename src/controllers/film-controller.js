import Film from '../components/film.js';
import FilmDetail from '../components/film-detail.js';
import {ClassName} from '../main.js';
import {Keycode, getTrueKeyInObject, removeChildren} from '../components/utils.js';

const EMOJI_WIDTH = 55;
const EMOJI_HEIGHT = 55;

class FilmController {
  constructor(onViewChange, onDataChange) {
    this._entity = null;
    this._containerElement = null;
    this._onViewChange = onViewChange;
    this._onDataChange = onDataChange;
    this._film = null;
    this._filmDetail = null;
    this.onDocumentKeydown = this.onDocumentKeydown.bind(this);
    this._onFilmElementClick = this._onFilmElementClick.bind(this);
    this._onFilmDetailElementClick = this._onFilmDetailElementClick.bind(this);
  }

  render(entity, containerElement) {
    this._entity = entity;
    this._containerElement = containerElement;
    this._createFilm();
  }

  setDefaultView() {
    if (this._filmDetail) {
      this._filmDetail.removeElement();
    }
  }

  onDocumentKeydown(evt) {
    if (evt.keyCode === Keycode.ESC) {
      this._filmDetail.removeElement();
      document.removeEventListener(`keydown`, this.onDocumentKeydown);
    } else if (evt.ctrlKey && evt.keyCode === Keycode.ENTER) {
      this._addComment();
    }
  }

  _onFilmElementClick(evt) {
    evt.preventDefault();
    this._openFilmDetail(evt.target);
    this._changeDataInFilmElement(evt.target);
  }

  _onFilmDetailElementClick(evt) {
    this._closeFilmDetail(evt.target);
    this._changeControlsInDetailFilmElement(evt.target);
    this._changeRaiting(evt.target);
    this._selectEmoji(evt.target);
  }

  _rerender(className, handler) {
    const oldElement = this[className].getElement();
    const parent = oldElement.parentElement;
    this[className].removeLinkToElement();
    const newElement = this[className].getElement();
    parent.replaceChild(newElement, oldElement);
    this[className].addClickHandlerOnElement(handler);
  }

  _createFilm() {
    this._film = new Film(this._entity);
    this._film.renderElement(this._containerElement);
    this._film.addClickHandlerOnElement(this._onFilmElementClick);
  }

  _createDetailFilm() {
    this._filmDetail = new FilmDetail(this._entity);
    this._filmDetail.renderElement(document.body);
    this._filmDetail.addClickHandlerOnElement(this._onFilmDetailElementClick);
    document.addEventListener(`keydown`, this.onDocumentKeydown);
  }

  _openFilmDetail(target) {
    const targetClasses = [ClassName.FILM_POSTER, ClassName.FILM_TITLE, ClassName.FILM_COMMENT_COUNT];
    const isTargetClass = targetClasses.find((item) => {
      return target.classList.contains(item);
    });
    const isTargetClicked = target.classList.contains(isTargetClass);

    if (isTargetClicked) {
      this._onViewChange();
      this._createDetailFilm(this._entity);
    }
  }

  _closeFilmDetail(element) {
    if (element.classList.contains(ClassName.FILM_DETAIL_CLOSE_BUTTON)) {
      this._filmDetail.removeElement();
      document.removeEventListener(`keydown`, this._onDocumentKeydown);
    }
  }

  _changeDataInFilmElement(element) {
    const property = {
      isWatched: element.classList.contains(ClassName.MARK_AS_WATCHED_BUTTON_ON_FILM),
      isMarked: element.classList.contains(ClassName.ADD_TO_WATCHLIST_BUTTON_ON_FILM),
      isFavorite: element.classList.contains(ClassName.ADD_TO_FAVORITES_BUTTON_ON_FILM)
    };
    const changedProperty = getTrueKeyInObject(property);
    const isActive = element.classList.contains(ClassName.ACTIVE_BUTTON_ON_FILM);
    this._changeData(changedProperty, isActive, false);
  }

  _changeControlsInDetailFilmElement(element) {
    const property = {
      isWatched: element.classList.contains(ClassName.MARK_AS_WATCHED_BUTTON_ON_FILM_DETAIL),
      isMarked: element.classList.contains(ClassName.ADD_TO_WATCHLIST_BUTTON_ON_FILM_DETAIL),
      isFavorite: element.classList.contains(ClassName.ADD_TO_FAVORITES_BUTTON_ON_FILM_DETAIL)
    };
    const changedProperty = getTrueKeyInObject(property);
    const isActive = element.previousElementSibling && element.previousElementSibling.checked;
    this._changeData(changedProperty, isActive, true);
  }

  _changeData(property, isActive, isFilmDetail) {
    if (property) {
      this._onDataChange(this._entity.id, property, !isActive);
      this._rerender(`_film`, this._onFilmElementClick);
      if (isFilmDetail) {
        this._rerender(`_filmDetail`, this._onFilmDetailElementClick);
      }
    }
  }

  _changeRaiting(element) {
    if (element.classList.contains(ClassName.RAITING_LABEL_ON_FILM_DETAIL)) {
      this._entity.userRaiting = Number(element.textContent);
      this._rerender(`_filmDetail`, this._onFilmDetailElementClick);
    }
  }

  _selectEmoji(element) {
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
  }

  _addComment() {
    const emojiListElement = this._filmDetail.getElement().querySelector(`.${ClassName.EMOJI_LIST_ON_FILM_DETAIL}`);
    const commentFieldElement = this._filmDetail.getElement().querySelector(`.${ClassName.COMMENT_FIELD_ON_FILM_DETAIL}`);

    const valide = this._validateComment(emojiListElement, commentFieldElement);
    const commentData = valide ? this._getCommentData(emojiListElement, commentFieldElement) : null
    console.log(commentData)
  }

  _validateComment(emojiListElement, commentFieldElement) {
    const isEmojiAdded = emojiListElement.querySelector(`input:checked`);
    const isCommentFilled = commentFieldElement.value.length;

    return !!isEmojiAdded && !!isCommentFilled;
  }

  _getCommentData(emojiListElement, commentFieldElement) {
    return {
      emotion: emojiListElement.querySelector(`input:checked`).value,
      comment: commentFieldElement.value,
      date: new Date().toISOString(),
    }
  }

}

export default FilmController;
