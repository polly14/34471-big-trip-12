import {humanizeDate} from "../utils/point.js";
import AbstractView from "./abstract.js";

const createPointOffersTemplate = (offer) => {

  const {offerName, offerPrice} = offer;

  return `<li class="event__offer">
    <span class="event__offer-title">${offerName}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${offerPrice}</span>
  </li>`;
};

const createRoutePointTemplate = (point, offer) => {

  const offersTemplate = () => {
    const offersChecked = offer.filter((item) => item.checkedOffer === true)
      .splice(0, 3)
      .map((item, index) => createPointOffersTemplate(item, index === 0))
      .join(``);
    return offersChecked;
  };

  const {pointType, destination, pointPrice, pointStartTime, pointTime} = point;

  let pretext = `to`;
  if (pointType.group === `Activity`) {
    pretext = `in`;
  }

  const startTime = humanizeDate(pointStartTime);

  const getEndTime = () => {
    const time = new Date(pointStartTime);
    const copiedDate = new Date(time.getTime());
    copiedDate.setMinutes(copiedDate.getMinutes() + pointTime);
    return humanizeDate(copiedDate);
  };

  const endTime = getEndTime();

  const duration = () => {
    let time = ``;
    if (pointTime >= 60) {
      time = `${Math.floor(pointTime / 60)}H ${pointTime % 60}M`;
    } else {
      time = `${pointTime}M`;
    }
    return time;
  };

  return `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${pointType.type.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${pointType.type} ${pretext} ${destination}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${startTime}">${startTime}</time>
          &mdash;
          <time class="event__end-time" datetime="${endTime}">${endTime}</time>
        </p>
        <p class="event__duration">${duration()}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${pointPrice}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offersTemplate()}
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

export default class RoutePoint extends AbstractView {
  constructor(point, offer) {
    super();
    this._point = point;
    this._offer = offer;
    this._editClickHandler = this._editClickHandler.bind(this);

  }

  getTemplate() {
    return createRoutePointTemplate(this._point, this._offer);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
  }

}
