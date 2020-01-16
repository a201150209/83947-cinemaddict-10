
import {MonthNames, createTemplateFromCollection} from './utils.js';
import Abstract from './abstract.js';
const moment = require('moment');

const RAITING_COUNT = 9;

const getGenreTemplate = (genre) => {
  return `<span class="film-details__genre">${genre}</span>`;
};

const getCheckedStatus = (condition) => {
  return condition ? `checked` : ``;
};

const getUserRaitingTemplate = (raiting) => {
  return (
    `<p class="film-details__user-rating">Your rate ${raiting}</p>`
  );
};

const getRaitingTemplate = (value, isUserRaiting) => {
  const isChecked = getCheckedStatus(isUserRaiting);

  return (
    `<input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${value}" id="rating-${value}" ${isChecked}>
      <label class="film-details__user-rating-label" for="rating-${value}">${value}</label>`
  );
};

const getRaitingBlockTemplate = (posterName, title, userRaiting) => {

  const raitingTemplates = new Array(RAITING_COUNT).fill(``).map((item, i) => {
    const value = i + 1;
    return getRaitingTemplate(value, value === userRaiting);
  }).join(`\n`);

  return (
    `<div class="form-details__middle-container">
      <section class="film-details__user-rating-wrap">
        <div class="film-details__user-rating-controls">
          <button class="film-details__watched-reset" type="button">Undo</button>
        </div>

        <div class="film-details__user-score">
          <div class="film-details__user-rating-poster">
            <img src="./images/posters/${posterName}.jpg" alt="film-poster" class="film-details__user-rating-img">
          </div>

          <section class="film-details__user-rating-inner">
            <h3 class="film-details__user-rating-title">${title}</h3>

            <p class="film-details__user-rating-feelings">How you feel it?</p>

            <div class="film-details__user-rating-score">
              ${raitingTemplates}
            </div>
          </section>
        </div>
      </section>
    </div>`
  );
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

const getGenreTitle = (count) => {
  return count > 1 ? `Genres` : `Genre`;
};


const formatDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
}

const createFilmDetailTemplate = (entity) => {
  const releaseDate = formatDate(entity.releaseDate);
  const writerNames = entity.writerNames.join(`, `);
  const actorNames = entity.actorNames.join(`, `);
  const duration = `${entity.duration.hour}h ${entity.duration.minut}m`;
  const genres = createTemplateFromCollection(entity.genres, getGenreTemplate);
  const genreTitle = getGenreTitle(genres.length);
  const comments = createTemplateFromCollection(entity.comments, getCommentTemplate);
  const isWatched = getCheckedStatus(entity.isWatched);
  const isFavorite = getCheckedStatus(entity.isFavorite);
  const isMarked = getCheckedStatus(entity.isMarked);
  const posterName = entity.posterName;
  const ageLimit = entity.ageLimit;
  const title = entity.title;
  const originalTitle = entity.originalTitle;
  const raiting = entity.raiting;
  const directorName = entity.directorName;
  const countryName = entity.countryName;
  const description = entity.description;
  const commentCount = entity.commentCount;
  const userRaiting = entity.userRaiting;
  let raitingBlockTemplate = isWatched ? getRaitingBlockTemplate(posterName, title, userRaiting) : ``;
  let userRaitingTemplate = isWatched && userRaiting ? getUserRaitingTemplate(userRaiting) : ``;

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
                  ${userRaitingTemplate}
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
                  <td class="film-details__term">${genreTitle}</td>
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

        ${raitingBlockTemplate}

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

class FilmDetail extends Abstract {
  constructor(entity) {
    super();
    this._entity = entity;
    this._createTemplateFunc = createFilmDetailTemplate;
  }
}

export default FilmDetail;
