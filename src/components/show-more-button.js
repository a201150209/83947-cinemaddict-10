import {renderElement, getElementInClass, getTemplateInClass, removeElementInClass} from './utils.js';

const createShowMoreButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

class ShowMoreButton {
  getTemplate() {
    return getTemplateInClass(this, createShowMoreButtonTemplate);
  }

  getElement() {
    return getElementInClass(this);
  }

  renderElement(parentElement) {
    renderElement(parentElement, this.getElement());
  }

  removeElement() {
    removeElementInClass(this);
  }

  addClickHandlerOnElement(handler) {
    this._element.addEventListener(`click`, handler);
  }
}

export {ShowMoreButton};
