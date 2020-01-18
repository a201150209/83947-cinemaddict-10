const filterToProperty = {
  all: `name`,
  wathlist: `isMarked`,
  history: `isWatched`,
  favorites: `isFavorite`
};

class Films {
  constructor(entites) {
    this._entites = entites;
    this._filteredEntites = null;
    this._activeFilter = `all`;
  }

  getEntities() {
    return this._filteredEntites || this._entites;
  }

  setEntities(entities) {
    this._entites = entities;
  }

  activateFilter(filter) {
    const property = filterToProperty[filter];
    this._filteredEntites = this._entites.filter((item) => {
      return item[property];
    });
  }
}

export default Films;
