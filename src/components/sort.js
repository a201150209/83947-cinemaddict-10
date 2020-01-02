import {renderElement, removeElementInClass, getElementInClass, getTemplateInClass} from './utils.js';

const createSortTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};

class Sort {
  getTemplate() {
    return getTemplateInClass(this, createSortTemplate);
  }

  getElement() {
    return getElementInClass(this);
  }

  renderElement(parentElement) {
    renderElement(parentElement, this.getElement(), `afterbegin`);
  }

  removeElement() {
    removeElementInClass(this);
  }
}

export {Sort};
