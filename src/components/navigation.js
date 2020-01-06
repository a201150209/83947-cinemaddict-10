import Abstract from './abstract.js';

const createNavigationTemplate = (entity) => {
  const favorited = entity.favorited;
  const watched = entity.watched;
  const marked = entity.marked;

  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${marked}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${watched}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favorited}</span></a>
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
      </nav>`
  );
};

class Navigation extends Abstract {
  constructor(entity) {
    super();
    this._entity = entity;
    this._createTemplateFunc = createNavigationTemplate;
  }
}

export default Navigation;
