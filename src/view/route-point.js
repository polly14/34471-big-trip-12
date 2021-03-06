import {humanizeDate, getDuration} from "../utils/point.js";
import AbstractView from "./abstract.js";

const createPointOffersTemplate = (item) => {

  const offerTitle = item.title;
  const offerPrice = item.price;

  return `<li class="event__offer">
    <span class="event__offer-title">${offerTitle}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${offerPrice}</span>
  </li>`;
};

const createRoutePointTemplate = (point) => {

  const {offersList, pointType, destination, pointPrice, pointStartTime, pointEndTime} = point;

  const offersTemplate = () => {
    const offersCheckedList = offersList.filter((item) => item.isOfferChecked === 1)
      .splice(0, 3)
      .map((item, index) => createPointOffersTemplate(item, index === 0))
      .join(``);
    return offersCheckedList;
  };

  let pretext = ``;
  const typePretext = () => {
    if (pointType === `Check-in` || pointType === `Sightseeing` || pointType === `Restaurant`) {
      pretext = `in`;
    } else {
      pretext = `to`;
    }
    return pretext;
  };

  const startTime = humanizeDate(pointStartTime);
  const endTime = humanizeDate(pointEndTime);
  const duration = getDuration(pointStartTime, pointEndTime);

  return `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${pointType.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${pointType} ${typePretext()} ${destination}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${startTime}">${startTime}</time>
          &mdash;
          <time class="event__end-time" datetime="${endTime}">${endTime}</time>
        </p>
        <p class="event__duration">${duration}</p>
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
  constructor(point) {
    super();
    this._point = point;

    this._editClickHandler = this._editClickHandler.bind(this);
  }

  getTemplate() {
    return createRoutePointTemplate(this._point);
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
