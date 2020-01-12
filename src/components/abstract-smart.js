import Abstract from './abstract.js';

class AbstractSmart extends Abstract {
  rerender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;
    this.removeLinkToElement();
    const newElement = this.getElement();
    parent.replaceChild(newElement, oldElement);
  }
}

export default AbstractSmart;