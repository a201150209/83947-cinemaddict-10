import Filters from '../components/filters.js';
import {ClassName} from '../main.js';

const TARGET_SYMBOL_IN_HREF = `#`;
const SHIFT_IN_HREF = 1;

class FiltersController {
  constructor(container, films, onFilterChange) {
    this._container = container;
    this._filters = null;
    this._films = films;
    this._activeElement = null;
    this._onFilterChange = onFilterChange;
    this._onFiltersElementClick = this._onFiltersElementClick.bind(this);
  }

  render(statistic) {
    this._filters = new Filters(statistic);
    this._filters.renderElement(this._container, `afterbegin`);
    this._filters.addClickHandlerOnElement(this._onFiltersElementClick);
  }

  changeActiveElement() {
    this._filters.getElement().querySelector(`.${ClassName.ACTIVE_FILTER}`).classList.remove(ClassName.ACTIVE_FILTER);
    this._activeElement.classList.add(ClassName.ACTIVE_FILTER);
  }

  _onFiltersElementClick(evt) {
    evt.preventDefault();
    const isFilterClicked = evt.target.classList.contains(ClassName.FILTER) && !evt.target.classList.contains(ClassName.ACTIVE_FILTER);
    if (isFilterClicked) {
      this._activeElement = evt.target;
      const clickedFilter = this._getClickedFilter(this._activeElement);
      this._films.activateFilter(clickedFilter);
      this._onFilterChange();
    }
  }

  _getClickedFilter(element) {
    const symbol = element.href.indexOf(TARGET_SYMBOL_IN_HREF, 0);
    const clickedFilter = element.href.slice(symbol + SHIFT_IN_HREF);
    return clickedFilter;
  }
}

export default FiltersController;
