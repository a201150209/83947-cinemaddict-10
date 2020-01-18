import Filters from '../components/filters.js';
import {ClassName} from '../main.js';

const TARGET_SYMBOL_IN_HREF = `#`;
const SHIFT_IN_HREF = 1;

class FilterController {
  constructor(container, films) {
    this._container = container;
    this._films = films;
  }

  render(statistic) {
    const getClickedFilter = (element) => {
      const symbol = element.href.indexOf(TARGET_SYMBOL_IN_HREF, 0);
      const clickedFilter = element.href.slice(symbol + SHIFT_IN_HREF);
      return clickedFilter;
    };

    const onFiltersClick = (evt) => {
      evt.preventDefault();
      const isFilterClicked = evt.target.classList.contains(ClassName.FILTER) && !evt.target.classList.contains(ClassName.ACTIVE_FILTER);
      if (isFilterClicked) {
        const clickedFilter = getClickedFilter(evt.target);
        this._films.activateFilter(clickedFilter);
        this.onFilterChange();
      }
    };

    const filters = new Filters(statistic);
    filters.renderElement(this._container, `afterbegin`);
    filters.addClickHandlerOnElement(onFiltersClick);
  }

  onFilterChange() {

  }

}

export default FilterController;
