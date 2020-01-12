import Film from '../components/film.js';
import FilmDetail from '../components/film-detail.js';
import {filmEntites, ClassName} from '../main.js';
import {Keycode} from '../components/utils.js';

class FilmController {
  constructor(containerElement, onDataChange) {
    this._containerElement = containerElement;
    this.onDataChange = onDataChange;
    this.film = null;
    this.filmDetail = null;
    this.entity = null;
  }

  render(entity) {
    const onFilmElementClick = (evt) => {
      evt.preventDefault();
      openFilmDetail(evt.target);

      const isAddToWatchlistClicked = evt.target.classList.contains(ClassName.ADD_TO_WATCHLIST_BUTTON_ON_FILM);
      const isMarkAsWatchedClicked = evt.target.classList.contains(ClassName.MARK_AS_WATCHED_BUTTON_ON_FILM);
      const isAddToFavoritesClicked = evt.target.classList.contains(ClassName.ADD_TO_FAVORITES_BUTTON_ON_FILM);
      const isActive = evt.target.classList.contains(ClassName.ACTIVE_BUTTON_ON_FILM);

      if (isAddToWatchlistClicked) {
        this.entity.isMarked = isActive ? false : true;
        this.onDataChange(`film`, onFilmElementClick);
      } else if (isMarkAsWatchedClicked) {
        this.entity.isWatched = isActive ? false : true;
        this.onDataChange(`film`, onFilmElementClick);
      } else if (isAddToFavoritesClicked) {
        this.entity.isFavorite = isActive ? false : true;
        this.onDataChange(`film`, onFilmElementClick);
      }
    };

    const onFilmDetailElementClick = (evt) => {
      evt.preventDefault();
      closeFilmDetail(evt.target);

      const isAddToWatchlistClicked = evt.target.classList.contains(ClassName.ADD_TO_WATCHLIST_BUTTON_ON_FILM_DETAIL);
      const isMarkAsWatchedClicked = evt.target.classList.contains(ClassName.MARK_AS_WATCHED_BUTTON_ON_FILM_DETAIL);
      const isAddToFavoritesClicked = evt.target.classList.contains(ClassName.ADD_TO_FAVORITES_BUTTON_ON_FILM_DETAIL);

      const isActive = evt.target.previousElementSibling && evt.target.previousElementSibling.checked === true;

      if (isAddToWatchlistClicked) {
        this.entity.isMarked = isActive ? false : true;
        this.onDataChange(`filmDetail`, onFilmDetailElementClick);
        this.onDataChange(`film`, onFilmElementClick);
      } else if (isMarkAsWatchedClicked) {
        this.entity.isWatched = isActive ? false : true;
        this.onDataChange(`filmDetail`, onFilmDetailElementClick);
        this.onDataChange(`film`, onFilmElementClick);
      } else if (isAddToFavoritesClicked) {
        this.entity.isFavorite = isActive ? false : true;
        this.onDataChange(`filmDetail`, onFilmDetailElementClick);
        this.onDataChange(`film`, onFilmElementClick);
      }


    };

    const onDocumentKeydown = (evt) => {
      evt.preventDefault();
      if (evt.keyCode === Keycode.ESC) {
        this.filmDetail.removeElement();
        document.removeEventListener(`keydown`, onDocumentKeydown);
      }
    };

    const createFilm = () => {
      this.film = new Film(this.entity);
      this.film.renderElement(this._containerElement);
      this.film.addClickHandlerOnElement(onFilmElementClick);
    };

    const createDetailFilm = () => {
      this.filmDetail = new FilmDetail(this.entity);
      this.filmDetail.renderElement(document.body);
      this.filmDetail.addClickHandlerOnElement(onFilmDetailElementClick);
      document.addEventListener(`keydown`, onDocumentKeydown);
    };

    const openFilmDetail = (target) => {
      const targetClasses = [ClassName.FILM_POSTER, ClassName.FILM_TITLE, ClassName.FILM_COMMENT_COUNT];
      const isTargetClicked = target.classList.contains(targetClasses.find((item) => {
        return target.classList.contains(item);
      }));

      if (isTargetClicked) {
        createDetailFilm(this.entity);
      }
    };

    const closeFilmDetail = (target) => {
      if (target.classList.contains(ClassName.FILM_DETAIL_CLOSE_BUTTON)) {
        this.filmDetail.removeElement();
        document.removeEventListener(`keydown`, onDocumentKeydown);
      }
    }

    this.entity = entity;
    createFilm();
  }

}

export default FilmController;