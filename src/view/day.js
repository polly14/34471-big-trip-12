import {createElement} from "../utils.js";

let num = 0;
const createItemDay = (point) => {

  const counter = () => {
    return ++num;
  };

  return `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${counter()}</span>
        <time class="day__date" datetime="${point[2]}-${point[1]}-${point[0]}">${point[1]} ${point[0]}</time>
      </div>
      <ul class="trip-events__list"></ul>
    </li>`;
};

const createDaysTemplate = (dayItems) => {

  const dayItemsTemplate = dayItems
    .map((point, index) => createItemDay(point, index === 0))
    .join(``);

  return `<ul class="trip-days">${dayItemsTemplate}</ul>`;
};

export default class Days {
  constructor(days) {
    this._element = null;
    this._days = days;
  }

  getTemplate() {
    return createDaysTemplate(this._days);
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
