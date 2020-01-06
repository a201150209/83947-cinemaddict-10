
import Abstract from './abstract.js';

const createSortTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active" data-type="title">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-type="releaseDate">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-type="raiting">Sort by rating</a></li>
    </ul>`
  );
};

class Sort extends Abstract {
  constructor() {
    super();
    this._createTemplateFunc = createSortTemplate;
  }
}

export {Sort};
