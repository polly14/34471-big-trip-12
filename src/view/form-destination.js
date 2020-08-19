import {createElement} from "../utils.js";

const createFormDestination = (point) => {

  const {destinationText} = point;

  return `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${destinationText}</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
        
      </div>
    </div>
  </section>`;
};

export default class FormDestination {
  constructor(point) {
    this._element = null;
    this._point = point;
  }

  getTemplate() {
    return createFormDestination(this._point);
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
