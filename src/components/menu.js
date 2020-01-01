import {renderElement, removeElementInClass, getElementInClass} from './utils.js';


const createNavigationTemplate = (entity) => {
  const favorited = entity._favorited;
  const watched = entity._watched;
  const marked = entity._marked;

  return (
    `<a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${marked}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${watched}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favorited}</span></a>
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>`
  );
};

class Navigation {
  constructor(stats) {
    this._favorited = stats.favorited;
    this._watched = stats.watched;
    this._marked = stats.marked;
  }

  getTemplate() {
    return createNavigationTemplate(this);
  }

  getElement(propertyName, template) {
    return getElementInClass.call(this, propertyName, template);
  }

  removeElement(elementName) {
    return removeElementInClass.call(this, elementName);
  }

  renderElement(parentElement) {
    renderElement(parentElement, this.getElement('_element', this.getTemplate()));
  }
}

export {Navigation as Menu};
