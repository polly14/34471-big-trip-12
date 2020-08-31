import {TYPES} from "../const.js";
import AbstractView from "./abstract.js";
import {humanizeFull} from "../utils/point.js";
import {getRandomInteger} from "../utils/common.js";

const BLANK_POINT = {
  pointType: TYPES[0].type,
  destination: ``,
  destinationText: ``,
  pointPrice: 0,
  pointStartTime: ``,
  pointTime: 10,
};
const BLANK_OFFER = {
  offerName: ``,
  offerPrice: ``,
  counter: ``
};

const createItemTypes = (item) => {

  return `<div class="event__type-item">
    <input id="event-type-${item.type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item.type.toLowerCase()}">
    <label class="event__type-label  event__type-label--${item.type.toLowerCase()}" for="event-type-${item.type.toLowerCase()}-1">${item.type}</label>
  </div>`;
};

const createPhotos = () => {

  const generatePhoto = () => {
    const photoSrc = `http://picsum.photos/248/152?r=${Math.random()}`;
    return photoSrc;
  };

  return `<img class="event__photo" src="${generatePhoto()}" alt="Event photo">`;
};

const createItemFormDetails = (offer) => {

  const {offerName, offerPrice, counter, checkedOffer} = offer;
  const isCheckedOffer = checkedOffer
    ? `checked`
    : ``;

  return `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${counter}" type="checkbox" name="event-offer-luggage" ${isCheckedOffer}>
    <label class="event__offer-label" for="event-offer-luggage-${counter}">
      <span class="event__offer-title">${offerName}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offerPrice}</span>
    </label>
  </div>`;
};

const createFormTemplate = (items, detailItems) => {

  const {pointType, destination, destinationText, pointPrice, pointStartTime, pointTime} = items;
  const startTime = humanizeFull(pointStartTime);
  const getEndTime = () => {
    const time = new Date(pointStartTime);
    const copiedDate = new Date(time.getTime());
    copiedDate.setMinutes(copiedDate.getMinutes() + pointTime);
    return humanizeFull(copiedDate);
  };
  const endTime = getEndTime();
  const typeItemsTemplate = (g) => {
    const typeItems = TYPES.filter((item) => item.group === g)
      .map((item, index) => createItemTypes(item, index === 0))
      .join(``);
    return typeItems;
  };
  let pretext = ``;
  const typePretext = () => {
    if (pointType.group === `Transfer`) {
      pretext = `to`;
    }
    if (pointType.group === `Activity`) {
      pretext = `in`;
    }
    return pretext;
  };
  const detailItemsTemplate = detailItems
    .map((offer, index) => createItemFormDetails(offer, index === 0))
    .join(``);
  const photoCount = new Array(getRandomInteger(3, 8)).fill();
  const photoTemplate = photoCount
    .map((item, index) => createPhotos(item, index === 0))
    .join(``);

  return `<form class="trip-events__item  event  event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${pointType.type.toLowerCase()}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Transfer</legend>
            ${typeItemsTemplate(`Transfer`)}
          </fieldset>

          <fieldset class="event__type-group">
            <legend class="visually-hidden">Activity</legend>
            ${typeItemsTemplate(`Activity`)}

          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${pointType.type} ${typePretext()}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
        <datalist id="destination-list-1">
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
          <option value="Saint Petersburg"></option>
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">
          From
        </label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTime}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">
          To
        </label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endTime}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${pointPrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${detailItemsTemplate}
        </div>
      </section>
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destinationText}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${photoTemplate}
          </div>
        </div>
      </section>
    </section>
  </form>`;
};

export default class Form extends AbstractView {
  constructor(items, offer) {
    super();
    this._items = items || BLANK_POINT;
    this._offer = offer || BLANK_OFFER;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  getTemplate() {
    return createFormTemplate(this._items, this._offer);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener(`submit`, this._formSubmitHandler);
  }

}
