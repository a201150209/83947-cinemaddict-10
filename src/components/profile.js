import {renderElement, removeElementInClass, getElementInClass, getTemplateInClass} from './utils.js';

const createProfileTemplate = (entity) => {
  const raiting = entity._raiting;
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${raiting}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

class Profile {
  constructor(raiting) {
    this._raiting = raiting;
  }

  getTemplate() {
    return getTemplateInClass.call(this, createProfileTemplate);
  }

  getElement() {
    return getElementInClass.call(this);
  }

  renderElement(parentElement) {
    renderElement(parentElement, this.getElement());
  }

  removeElement(elementName = `_element`) {
    this[elementName].remove();
    return removeElementInClass.call(this, elementName);
  }

}

export {Profile};
