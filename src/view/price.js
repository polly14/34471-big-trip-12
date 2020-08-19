import {createElement} from "../utils.js";

let sum = 0;

const createPriceTemplate = (point) => {

  for (let i = 0; i < point.length; i++) {
    sum += point[i].pointPrice;
  }

  return `<section class="trip-main__trip-info  trip-info">
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${sum}</span>
    </p>
  </section>`;
};

export default class Price {
  constructor(point) {
    this._element = null;
    this._point = point;
  }

  getTemplate() {
    return createPriceTemplate(this._point);
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
