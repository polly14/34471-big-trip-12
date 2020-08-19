import {createElement} from "../utils.js";

const createItemFilter = (item) => {

  return `<div class="trip-filters__filter">
    <input id="filter-${item.name.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${item.name.toLowerCase()}">
    <label class="trip-filters__filter-label" for="filter-${item.name.toLowerCase()}">${item.name}</label>
  </div>`;
};


const createFilterTemplate = (filterItems) => {

  const filterItemsTemplate = filterItems
    .map((item, index) => createItemFilter(item, index === 0))
    .join(``);

  return `<form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};

export default class Filter {
  constructor(items) {
    this._element = null;
    this._items = items;
  }

  getTemplate() {
    return createFilterTemplate(this._items);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
