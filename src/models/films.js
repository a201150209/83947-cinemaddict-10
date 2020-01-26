import {sortArrWithObjByKey} from '../components/utils.js';
import {filmListConfig} from '../main.js';

const DEFAULT_SORT_PROPERTY = `default`;
const DEFAULT_FILTER_PROPERTY = `all`;

const filterToProperty = {
  all: `title`,
  watchlist: `isMarked`,
  history: `isWatched`,
  favorites: `isFavorite`
};

class Films {
  constructor(entities) {
    this._entities = entities;
    this._changedEntities = null;
    this._activeFilter = DEFAULT_FILTER_PROPERTY;
    this._activeSort = DEFAULT_SORT_PROPERTY;
    this._updateFilters = null;
    this._updateFilms = null;
    this.onDataChange = this.onDataChange.bind(this);

  }

  setViewUpdater(name, func) {
    this[name] = func;
  }

  getEntities() {
    return this._changedEntities || this._entities;
  }

  activateFilter(filter) {
    const property = filterToProperty[filter];
    let entities;

    if (this._activeFilter !== DEFAULT_FILTER_PROPERTY) {
      entities = this._entities.slice();
      entities = sortArrWithObjByKey(entities, this._activeSort);
    } else {
      entities = this.getEntities();
    }

    this._changedEntities = entities.filter((item) => {
      return item[property];
    });

    filmListConfig.General.Count.filtered = this._changedEntities.length;
    this._activeFilter = property;
  }

  activateSort(config) {
    const isDefault = config.sortProperty === DEFAULT_SORT_PROPERTY;
    const isFiltered = this._activeFilter !== DEFAULT_FILTER_PROPERTY;
    const entities = isDefault ? this._entities : this.getEntities();

    this._changedEntities = sortArrWithObjByKey(entities, config.sortProperty || config.SORT_PROPERTY);

    if (isFiltered) {
      this._changedEntities = this._changedEntities.filter((item) => {
        return item[this._activeFilter];
      });
      config.Count.filtered = this._changedEntities.length;
    }

    this._activeSort = config.sortProperty;
  }

  onDataChange(entity, property, newValue) {
    entity[property] = newValue;
    this._updateFilters();
  }

  getStatistic() {
    const statistic = {
      favorited: 0,
      watched: 0,
      marked: 0
    };

    this._entities.forEach((item) => {
      if (item.isFavorite) {
        statistic.favorited++;
      }

      if (item.isWatched) {
        statistic.watched++;
      }

      if (item.isMarked) {
        statistic.marked++;
      }
    });

    return statistic;
  }
}

export default Films;
