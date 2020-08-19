import {createElement} from "../utils.js";

const createFormPhotos = (point) => {

  const {destinationPhotos} = point;

  return `<img class="event__photo" src="${destinationPhotos}" alt="Event photo">`;
};

export default class FormPhotos {
  constructor(point) {
    this._element = null;
    this._point = point;
  }

  getTemplate() {
    return createFormPhotos(this._point);
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
