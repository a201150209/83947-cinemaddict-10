import {MonthNames, createTemplateFromCollection, renderElement, removeElementInClass, getElementInClass, getTemplateInClass} from './utils.js';

const SelectorElement = {
  PARENT: `body`,
  CLOSE_BUTTON: `.film-details__close-btn`
};

let renderedFilmDetail;

const parentElement = document.querySelector(SelectorElement.PARENT);

const getGenreTemplate = (genre) => {
  return `<span class="film-details__genre">${genre}</span>`;
};

const getCheckedStatus = (condition) => {
  if (condition) {
    return `checked`;
  }
  return ``;
};

const getCommentTemplate = (entity) => {
  const date = `${entity.date.getFullYear()}/${entity.date.getMonth() + 1}/${entity.date.getDate()}`;

  return (
    `<li class= "film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${entity.icon}.png" width="55" height="55" alt="emoji">
      </span>
      <div>
        <p class="film-details__comment-text">${entity.text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${entity.author}</span>
          <span class="film-details__comment-day">${date}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

const onElementClick = function (evt) {
  evt.preventDefault();
  if (evt.target === renderedFilmDetail.closeButtonElement) {
    renderedFilmDetail.removeElement();
  }
};

const createFilmDetailTemplate = (entity) => {
  const releaseDate = `${entity._releaseDate.getDate()} ${MonthNames[entity._releaseDate.getMonth()]} ${entity._releaseDate.getFullYear()}`;
  const writerNames = entity._writerNames.join(`, `);
  const actorNames = entity._actorNames.join(`, `);
  const duration = `${entity._duration.hour}h ${entity._duration.minut}m`;
  const genres = createTemplateFromCollection(entity._genres, getGenreTemplate);
  const comments = createTemplateFromCollection(entity._comments, getCommentTemplate);
  const isWatched = getCheckedStatus(entity.isWatched);
  const isFavorite = getCheckedStatus(entity.isFavorite);
  const isMarked = getCheckedStatus(entity.isMarked);
  const posterName = entity._posterName;
  const ageLimit = entity._ageLimit;
  const title = entity._title;
  const originalTitle = entity._originalTitle;
  const raiting = entity._raiting;
  const directorName = entity._directorName;
  const countryName = entity._countryName;
  const description = entity._description;
  const commentCount = entity._commentCount;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${posterName}.jpg" alt="">

              <p class="film-details__age">${ageLimit}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${originalTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${raiting}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${directorName}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writerNames}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actorNames}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${releaseDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${countryName}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    ${genres}
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isMarked}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to
              watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched"  ${isWatched}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already
              watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite"  ${isFavorite}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to
              favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentCount}</span></h3>

            <ul class="film-details__comments-list">
              ${comments}
            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label"></div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here"
                  name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile"
                  value="sleeping">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio"
                  id="emoji-sleeping" value="neutral-face">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke"
                  value="grinning">
                <label class="film-details__emoji-label" for="emoji-gpuke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry"
                  value="grinning">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

class FilmDetail {
  constructor(entity) {
    this._title = entity.title;
    this._originalTitle = entity.originalTitle;
    this._directorName = entity.directorName;
    this._writerNames = entity.writerNames;
    this._actorNames = entity.actorNames;
    this._posterName = entity.posterName;
    this._description = entity.description;
    this._raiting = entity.raiting;
    this._releaseDate = entity.releaseDate;
    this._duration = entity.duration;
    this._genres = entity.genres;
    this._commentCount = entity.commentCount;
    this._ageLimit = entity.ageLimit;
    this._countryName = entity.countryName;
    this._comments = entity.comments;
    this._isWatched = entity.isWatched;
    this._isFavorite = entity.isFavorite;
    this._isMarked = entity.isMarked;
  }

  getTemplate() {
    return getTemplateInClass.call(this, createFilmDetailTemplate);
  }

  getElement() {
    return getElementInClass.call(this);
  }

  renderElement() {
    renderElement(parentElement, this.getElement());
    this._element.addEventListener(`click`, onElementClick);
    renderedFilmDetail = this;
  }

  removeElement() {
    this._element.remove();
    this._element = null;
  }

  get closeButtonElement() {
    return this._element.querySelector(SelectorElement.CLOSE_BUTTON);
  }
}

export {FilmDetail};
