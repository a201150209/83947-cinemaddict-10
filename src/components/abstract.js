import {createElementFromTemplate} from './utils.js';

class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error(`Can't instantiate Abstract, only concrete one.`);
    }
    this._element = null;
  }

  getTemplate() {
    return this._createTemplateFunc(this._entity);
  }

  getElement() {
    if (!this._element) {
      this._element = createElementFromTemplate(this.getTemplate());
    }
    return this._element;
  }

  renderElement(parentElement, place = `beforeend`) {
    parentElement.insertAdjacentElement(place, this.getElement());
  }

  removeElement() {
    this.getElement().remove();
    this._element = null;
  }

  removeLinkToElement() {
    this._element = null;
  }

  addClickHandlerOnElement(handler) {
    this._element.addEventListener(`click`, handler);
  }
}

export default Abstract;
