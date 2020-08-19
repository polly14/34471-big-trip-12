import {createElement} from "../utils.js";

const createPointOffersTemplate = (offer) => {

  const {offerName, offerPrice} = offer;

  return `<li class="event__offer">
    <span class="event__offer-title">${offerName}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${offerPrice}</span>
  </li>`;
};

export default class PointOffers {
  constructor(offer) {
    this._element = null;
    this._offer = offer;
  }

  getTemplate() {
    return createPointOffersTemplate(this._offer);
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
