import {renderTemplate} from './utils.js';
import {mainElement} from '../main.js';


const createFilmListsTemplate = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

        <div class="films-list__container"></div>
      </section>

      <section class="films-list--extra top-rated">
        <h2 class="films-list__title">Top rated</h2>
        <div class="films-list__container">
        </div>
      </section>
      <section class="films-list--extra most-commented">
        <h2 class="films-list__title">Most commented</h2>
        <div class="films-list__container">
        </div>
      </section>
    </section>`
  );
};

export const renderFilmList = () => {
  renderTemplate(mainElement, createFilmListsTemplate());
};
