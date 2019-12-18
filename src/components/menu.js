import {renderTemplate} from './utils.js';
import {mainElement} from '../main.js';
import {filmEntites} from './film.js';

export let statistic;

const getStatistic = () => {

  const stats = {
    favorited: 0,
    watched: 0,
    marked: 0
  };

  filmEntites.forEach((item) => {
    if (item.isFavorite) {
      stats.favorited++;
    }

    if (item.isWatched) {
      stats.watched++;
    }

    if (item.isMarked) {
      stats.marked++;
    }
  });

  return stats;
};

const createMenuTemplate = (stats) => {

  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${stats.marked}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${stats.watched}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${stats.favorited}</span></a>
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>

    <ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};

export const renderMenu = () => {
  statistic = getStatistic();
  renderTemplate(mainElement, createMenuTemplate(statistic));
};
