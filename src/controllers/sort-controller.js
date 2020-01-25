import Sort from '../components/sort.js';
import {ClassName, filmListConfig} from '../main.js';


class SortController {
  constructor(container, films, onSortChange) {
    this._container = container;
    this._films = films;
    this._activeElement = null;
    this._onSortChange = onSortChange;
    this._onSortElementClick = this._onSortElementClick.bind(this);
  }

  render() {
    this._sort = new Sort();
    this._sort.renderElement(this._container, `afterbegin`);
    this._sort.addClickHandlerOnElement(this._onSortElementClick);
  }

  changeActiveElement() {
    this._sort.getElement().querySelector(`.${ClassName.SORT_ACTIVE_BUTTON}`).classList.remove(ClassName.SORT_ACTIVE_BUTTON);
    this._activeElement.classList.add(ClassName.SORT_ACTIVE_BUTTON);
  }

  _changeSortProperty(config, newProperty) {
    config.sortProperty = newProperty;
  }

  _onSortElementClick(evt) {
    evt.preventDefault();
    const isSortClicked = evt.target.dataset.type && !evt.target.classList.contains(ClassName.SORT_ACTIVE_BUTTON);

    if (isSortClicked) {
      this._activeElement = evt.target;
      this._changeSortProperty(filmListConfig.General, this._activeElement.dataset.type);
      this._films.activateSort(filmListConfig.General);
      this._onSortChange();
    }
  }
}

export default SortController;
