import {humanizeDate} from "../utils.js";
import {createElement} from "../utils.js";

const createRoutePointTemplate = (point) => {

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

      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

export default class RoutePoint {
  constructor(point) {
    this._element = null;
    this._point = point;
  }

  getTemplate() {
    return createRoutePointTemplate(this._point);
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
