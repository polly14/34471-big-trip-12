import AbstractView from "./abstract.js";
import {SortType} from "../const.js";

const keysItems = Object.values(SortType);

let num = -1;

const createItemSorting = () => {

  const counter = () => {
    ++num;
    return keysItems[num];
  };

  const counterResult = counter();

  return `<div class="trip-sort__item  trip-sort__item--${counterResult}" >
      <input id="sort-${counterResult}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${counterResult}" data-sort-type="${counterResult}" >
      <label class="trip-sort__btn" for="sort-${counterResult}" data-sort-type="${counterResult}" >
        ${counterResult}
        <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
          <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
        </svg>
      </label>
    </div>`;
};

const createSortingTemplate = () => {

  const sortingItemsTemplate = keysItems
    .map((item, index) => createItemSorting(item, index === 0))
    .join(``);

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <span class="trip-sort__item  trip-sort__item--day">Day</span>
    ${sortingItemsTemplate}

    <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
  </form>`;
};


export default class Sorting extends AbstractView {
  constructor() {
    super();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortingTemplate();
  }

  _sortTypeChangeHandler(evt) {

    if (evt.target.parentElement.tagName !== `DIV`) {
      return;
    }

    this._callback.sortTypeChange(evt.target.dataset.sortType);

  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }

}
