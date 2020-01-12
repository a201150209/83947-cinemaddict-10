import Abstract from './abstract.js';

const createShowMoreButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

class ShowMoreButton extends Abstract {
  constructor() {
    super();
    this._createTemplateFunc = createShowMoreButtonTemplate;
  }
}

export default ShowMoreButton;
