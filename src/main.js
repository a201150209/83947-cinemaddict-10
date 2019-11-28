import {renderTemplate} from './components/render.js';
import {createProfileTemplate} from './components/profile.js';
import {createMenuTemplate} from './components/menu.js';
import {createFilmListsTemplate} from './components/film-list.js';
import {createFilmDetailTemplate} from './components/film-detail.js';
import {createFilmTemplate} from './components/film.js';
import {createShowMoreButtonTemplate} from './components/show-more-button.js';

const MaxFilms = {
  IN_MAIN_LIST: 5,
  IN_EXTRA_LIST: 2
};

const SelectorElement = {
  HEADER: `header.header`,
  MAIN: `main.main`,
  FILM_LIST: `.films-list`,
  MAIN_FILMS_WRAPPER: `.films-list .films-list__container`,
  EXTRA_FILMS_WRAPPER: `.films-list--extra .films-list__container`
};

const headerElement = document.querySelector(SelectorElement.HEADER);
renderTemplate(headerElement, createProfileTemplate());

const mainElement = document.querySelector(SelectorElement.MAIN);
renderTemplate(mainElement, createMenuTemplate());
renderTemplate(mainElement, createFilmListsTemplate());
renderTemplate(mainElement, createFilmDetailTemplate());

const mainFilmsWrapperElement = mainElement.querySelector(SelectorElement.MAIN_FILMS_WRAPPER);
for (let i = 0; i < MaxFilms.IN_MAIN_LIST; i++) {
  renderTemplate(mainFilmsWrapperElement, createFilmTemplate());
}

const extraFilmsWrapperElements = Array.from(mainElement.querySelectorAll(SelectorElement.EXTRA_FILMS_WRAPPER));
extraFilmsWrapperElements.forEach((item) => {
  for (let i = 0; i < MaxFilms.IN_EXTRA_LIST; i++) {
    renderTemplate(item, createFilmTemplate());
  }
});

const filmsListElement = mainElement.querySelector(SelectorElement.FILM_LIST);
renderTemplate(filmsListElement, createShowMoreButtonTemplate());
