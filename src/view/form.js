import {TYPES, TYPEGROUPS, DESTINATIONS} from "../const.js";
import SmartView from "./smart.js";
import {humanizeFull} from "../utils/point.js";
import {counter} from "../utils/common.js";
import {generateOffer} from "../mock/route-point.js";
import flatpickr from "flatpickr";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const BLANK_POINT = {
  pointType: TYPES[0],
  destination: ``,
  description: ``,
  photos: ``,
  pointPrice: 0,
  pointStartTime: ``,
  pointTime: ``,
  pointEndTime: ``,
  offersList: ``,
  isFavorite: false,
};

const generateNewDescription = (item) => {
  for (let i = 0; i < DESTINATIONS.length; i++) {
    if (DESTINATIONS[i].name === item) {
      return DESTINATIONS[i].description;
    }
  }
  return DESTINATIONS[0].description;
};

const createItemTypes = (item) => {
  return `<div class="event__type-item">
    <input id="event-type-${item.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item}">
    <label class="event__type-label  event__type-label--${item.toLowerCase()}" for="event-type-${item.toLowerCase()}-1">${item}</label>
  </div>`;
};

const createDestinationsList = (item) => {
  return `<option value="${item.name}">${item.name}</option>`;
};

const createPhotos = (item) => {
  const photoSrc = item.src;
  return `<img class="event__photo" src="${photoSrc}${Math.random()}" alt="Event photo">`;
};

const createItemFormDetails = (item) => {
  const offerTitle = item.title;
  const offerPrice = item.price;
  const offerCounter = counter();
  const offerChecked = item.isOfferChecked;
  return `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${offerCounter}" type="checkbox" name="event-offer-luggage" ${offerChecked ? `checked` : ``}>
    <label class="event__offer-label" for="event-offer-luggage-${offerCounter}">
      <span class="event__offer-title">${offerTitle}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offerPrice}</span>
    </label>
  </div>`;
};

const createFormTemplate = (data) => {

  const {offersList, pointType, destination, photos, pointPrice, pointStartTime, pointEndTime, isFavorite, id, isDestinationSelected, isStartTimeSelected, isEndTimeSelected, isPointPrice} = data;

  const startTime = humanizeFull(pointStartTime);
  const endTime = humanizeFull(pointEndTime);

  const typeItemsTemplate = (g) => {
    const typeItems = TYPES.filter((item) => TYPEGROUPS[TYPES.indexOf(item)].group === g)
      .map((item, index) => createItemTypes(item, index === 0))
      .join(``);
    return typeItems;
  };

  const destListTemplate = () => {
    const typeItems = DESTINATIONS
      .map((item, index) => createDestinationsList(item, index === 0))
      .join(``);
    return typeItems;
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

  const detailItemsTemplate = `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${offersList
        .map((item, index) => createItemFormDetails(item, index === 0))
        .join(``)}
     </div>
  </section>`;

  const pointPhotos = photos;
  const photoTemplate = pointPhotos
    .map((item, index) => createPhotos(item, index === 0))
    .join(``);

  const descriptionTemplate = `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${generateNewDescription(destination)}</p>
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${photoTemplate}
      </div>
    </div>
  </section>`;

  const isSubmitDisabled = (destination === null);

  return `<form class="trip-events__item  event  event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${pointType.toLowerCase()}.png" alt="Event type icon">
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
          ${pointType} ${typePretext()}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${isDestinationSelected ? destination : ``}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${destListTemplate()}
        </datalist>
      </div>
      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">
          From
        </label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${isStartTimeSelected ? startTime : ``}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">
          To
        </label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${isEndTimeSelected ? endTime : ``}">
      </div>
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${isPointPrice ? pointPrice : ``}">
      </div>
      <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmitDisabled ? `disabled` : ``}>Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
      <input id="event-favorite-${id}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
      <label class="event__favorite-btn" for="event-favorite-${id}">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </label>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      ${detailItemsTemplate}
      ${isDestinationSelected ? descriptionTemplate : ``}
    </section>
  </form>`;
};

export default class Form extends SmartView {
  constructor(items = BLANK_POINT) {
    super();
    this._data = Form.parsePointToData(items);
    this._startDatepicker = null;
    this._endDatepicker = null;
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._startTimeChangeHandler = this._startTimeChangeHandler.bind(this);
    this._endTimeChangeHandler = this._endTimeChangeHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._editRollupHandler = this._editRollupHandler.bind(this);
    this._destinationToggleHandler = this._destinationToggleHandler.bind(this);
    this._pointPriceToggleHandler = this._pointPriceToggleHandler.bind(this);
    this._typeToggleHandler = this._typeToggleHandler.bind(this);

    this._setInnerHandlers();
    this._setStartTimeDatepicker();
    this._setEndTimeDatepicker();
  }

  reset(items) {
    this.updateData(
        Form.parsePointToData(items)
    );
  }

  getTemplate() {
    return createFormTemplate(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setStartTimeDatepicker();
    this._setEndTimeDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setEditRollupHandler(this._callback.editClick);
  }

  _setStartTimeDatepicker() {
    if (this._startDatepicker) {
      // В случае обновления компонента удаляем вспомогательные DOM-элементы,
      // которые создает flatpickr при инициализации
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }

    if (this._data.pointStartTime) {
      // flatpickr есть смысл инициализировать только в случае,
      // если поле выбора даты доступно для заполнения
      this._startDatepicker = flatpickr(
          this.getElement().querySelector(`#event-start-time-1`),
          {
            dateFormat: `d/m/y H:i`,
            enableTime: true,
            time24hr: true,
            defaultDate: this._data.pointStartTime,
            onChange: this._startTimeChangeHandler // На событие flatpickr передаём наш колбэк
          }
      );
    }
  }
  _setEndTimeDatepicker() {
    if (this._endDatepicker) {
      // В случае обновления компонента удаляем вспомогательные DOM-элементы,
      // которые создает flatpickr при инициализации
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }

    if (this._data.pointEndTime) {
      // flatpickr есть смысл инициализировать только в случае,
      // если поле выбора даты доступно для заполнения
      this._endDatepicker = flatpickr(
          this.getElement().querySelector(`#event-end-time-1`),
          {
            dateFormat: `d/m/y H:i`,
            enableTime: true,
            time24hr: true,
            minDate: this._data.pointStartTime,
            defaultDate: this._data.pointEndTime,
            onChange: this._endTimeChangeHandler // На событие flatpickr передаём наш колбэк
          }
      );
    }
  }

  _startTimeChangeHandler([userDate]) {
    this.updateData({
      pointStartTime: userDate
    }, true);
  }

  _endTimeChangeHandler([userDate]) {
    this.updateData({
      pointEndTime: userDate
    }, true);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`input`, this._destinationToggleHandler);
    this.getElement()
      .querySelector(`.event__input--price`)
      .addEventListener(`input`, this._pointPriceToggleHandler);
    this.getElement()
      .querySelector(`.event__type-list`)
      .addEventListener(`click`, this._typeToggleHandler);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteClickHandler);
  }

  _destinationToggleHandler(evt) {
    if (evt.target.value) {
      evt.preventDefault();
      this.updateData({
        destination: evt.target.value,
        description: generateNewDescription(evt.target.value)
      }, false);
    }
  }

  _pointPriceToggleHandler(evt) {
    if (evt.target.value) {
      evt.preventDefault();
      this.updateData({
        pointPrice: evt.target.value,
      }, true);
    }
  }

  _typeToggleHandler(evt) {
    if (evt.target.value) {
      evt.preventDefault();
      this.updateData({
        pointType: evt.target.value,
        offersList: generateOffer(),
      }, false);
    }
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(Form.parseDataToPoint(this._data));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener(`submit`, this._formSubmitHandler);
  }

  _editRollupHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditRollupHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editRollupHandler);
  }

  static parsePointToData(items) {
    return Object.assign(
        {},
        items,
        {
          isDestinationSelected: items.destination !== null,
          isStartTimeSelected: items.pointStartTime !== null,
          isEndTimeSelected: items.pointEndTime !== null,
          isPointPrice: items.pointPrice !== null,
        }
    );
  }

  static parseDataToPoint(data) {
    data = Object.assign({}, data);
    if (!data.isDestinationSelected) {
      data.destination = null;
    }
    if (!data.isStartTimeSelected) {
      data.pointStartTime = null;
    }
    if (!data.isEndTimeSelected) {
      data.pointEndTime = null;
    }
    if (!data.isPointPrice) {
      data.pointPrice = null;
    }

    delete data.isDestinationSelected;
    delete data.isStartTimeSelected;
    delete data.isEndTimeSelected;
    delete data.isPointPrice;

    return data;
  }
}
