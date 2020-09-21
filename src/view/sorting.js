import AbstractView from "./abstract.js";
import {SortType} from "../const.js";


const createSortingTemplate = (sortType) => {

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <span class="trip-sort__item  trip-sort__item--day">Day</span>

    <div class="trip-sort__item  trip-sort__item--${SortType.DEFAULT}" >
      <input id="sort-${SortType.DEFAULT}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.DEFAULT}" data-sort-type="${SortType.DEFAULT}" ${sortType === SortType.DEFAULT ? `checked` : ``}>
      <label class="trip-sort__btn" for="sort-${SortType.DEFAULT}" data-sort-type="${SortType.DEFAULT}" >
        ${SortType.DEFAULT}
        <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
          <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
        </svg>
      </label>
    </div>
    <div class="trip-sort__item  trip-sort__item--${SortType.TIME}" >
      <input id="sort-${SortType.TIME}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.TIME}" data-sort-type="${SortType.TIME}" ${sortType === SortType.TIME ? `checked` : ``}>
      <label class="trip-sort__btn" for="sort-${SortType.TIME}" data-sort-type="${SortType.TIME}" >
        ${SortType.TIME}
        <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
          <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
        </svg>
      </label>
    </div>
    <div class="trip-sort__item  trip-sort__item--${SortType.PRICE}" >
      <input id="sort-${SortType.PRICE}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.PRICE}" data-sort-type="${SortType.PRICE}" ${sortType === SortType.PRICE ? `checked` : ``}>
      <label class="trip-sort__btn" for="sort-${SortType.PRICE}" data-sort-type="${SortType.PRICE}" >
        ${SortType.PRICE}
        <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
          <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
        </svg>
      </label>
    </div>

    <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
  </form>`;
};


export default class Sorting extends AbstractView {
  constructor(sortType) {
    super();
    this._sortType = sortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortingTemplate(this._sortType);
  }

  _sortTypeChangeHandler(evt) {

    if (evt.target.parentElement.tagName !== `DIV`) {
      return;
    }
    this._sortType = evt.target.dataset.sortType;
    this._callback.sortTypeChange(evt.target.dataset.sortType);

  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }

}
