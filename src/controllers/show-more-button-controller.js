import ShowMoreButton from '../components/show-more-button.js';
import {filmListConfig} from '../main.js';

class ShowMoreButtonController {
  constructor(filmList, renderFilms) {
    this._button = null;
    this._filmList = filmList;
    this._renderFilms = renderFilms;
    this._onShowMoreButtonElementClick = this._onShowMoreButtonElementClick.bind(this);
  }

  render() {
    this._button = new ShowMoreButton();
    this.renderButton();
  }

  renderButton() {

    console.log(filmListConfig.General)
    if (!this._checkIsMaxFilms(filmListConfig.General)) {
      this._button.renderElement(this._filmList.getElement());
      this._button.addClickHandlerOnElement(this._onShowMoreButtonElementClick);
    }
  }

  getButton() {
    return this._button;
  }

  _onShowMoreButtonElementClick(evt) {
    evt.preventDefault();
    this._renderFilms(filmListConfig.General, this._filmList);
    this._filmList.hideEmptyElement();
    if (this._checkIsMaxFilms(filmListConfig.General)) {
      this._button.removeElement();
    }
  };

  _checkIsMaxFilms(config) {
    return config.Count.filtered ? config.currentIndex >= config.Count.filtered : config.currentIndex >= config.Count.MAX;
  };

}

export default ShowMoreButtonController;
