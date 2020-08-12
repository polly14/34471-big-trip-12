import {getRandomInteger} from "./utils.js";
import {humanizeYearMonthDay} from "./utils.js";
import {TYPES} from "./const.js";
import {SORTING} from "./const.js";
import {FILTERS} from "./const.js";
import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createFilterTemplate} from "./view/filters.js";
import {createSortingTemplate} from "./view/sorting.js";
import {createFormTemplate} from "./view/form.js";
import {createFormDetails} from "./view/form-details.js";
import {createFormDestination} from "./view/form-destination.js";
import {createFormPhotos} from "./view/form-photos.js";
import {createDaysTemplate} from "./view/day.js";
import {createRoutePointTemplate} from "./view/route-point.js";
import {createPointOffersTemplate} from "./view/point-offers.js";
import {createPriceTemplate} from "./view/price.js";
import {createRouteInfoTemplate} from "./view/route-info.js";
import {createTripEventsMsgTemplate} from "./view/trip-events-msg.js";
import {generateRoutePoint} from "./mock/route-point.js";
import {generateOffers} from "./mock/point-offers.js";
import {generatePhotos} from "./mock/form-photos.js";

const POINTS_COUNT = 30;

const points = new Array(POINTS_COUNT).fill().map(generateRoutePoint);

points.sort(function (a, b) {
  if (a.pointStartTime > b.pointStartTime) {
    return 1;
  }
  if (a.pointStartTime < b.pointStartTime) {
    return -1;
  }
  return 0;
});
const humDays = [];
for (let a = 0; a < points.length; a++) {
  humDays.push(humanizeYearMonthDay(points[a].pointStartTime));
}
const uniqueDays = new Set(humDays);
const allDays = Array.from(uniqueDays);
const allDaysNew = [];
for (let u = 0; u < allDays.length; u++) {
  allDaysNew.push(allDays[u].split(` `));
}

const rPoints = [];
for (let a = 0; a < points.length; a++) {
  rPoints.push(points[a].destination);
}

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
const tripMain = document.querySelector(`.trip-main`);
render(tripMain, createPriceTemplate(points), `afterbegin`);

const tripMainTripInfo = document.querySelector(`.trip-main__trip-info`);
render(tripMainTripInfo, createRouteInfoTemplate(allDaysNew, rPoints), `afterbegin`);

const tripMainTripControlsTitles = document.querySelectorAll(`h2.visually-hidden`);
render(tripMainTripControlsTitles[0], createSiteMenuTemplate(), `afterend`);
render(tripMainTripControlsTitles[1], createFilterTemplate(FILTERS), `afterend`);

const tripEvents = document.querySelector(`.trip-events`);
render(tripEvents, createSortingTemplate(SORTING), `beforeend`);

render(tripEvents, createDaysTemplate(allDaysNew), `beforeend`);

render(tripEvents, createTripEventsMsgTemplate(), `beforeend`);

const tripDays = document.querySelector(`.trip-days`);
render(tripDays, createFormTemplate(TYPES), `beforebegin`);

const eventHeader = document.querySelector(`.event__header`);
let offerCount = getRandomInteger(2, 5);
let offers = new Array(offerCount).fill().map(generateOffers);
render(eventHeader, createFormDetails(offers), `afterend`);

const eventDetails = document.querySelector(`.event__details`);
render(eventDetails, createFormDestination(points[0]), `beforeend`);

const eventPhotosTape = document.querySelector(`.event__photos-tape`);
const photoCount = getRandomInteger(3, 8);
const photos = new Array(photoCount).fill().map(generatePhotos);
for (let i = 0; i < photos.length; i++) {
  render(eventPhotosTape, createFormPhotos(photos[i]), `beforeend`);
}

const tripEventsList = document.querySelectorAll(`.trip-events__list`);

for (let d = 0; d < allDays.length; d++) {
  for (let i = 0; i < points.length; i++) {
    if (allDays[d] === humanizeYearMonthDay(points[i].pointStartTime)) {
      render(tripEventsList[d], createRoutePointTemplate(points[i]), `beforeend`);
    }
  }
}

const eventSelectedOffers = document.querySelectorAll(`.event__selected-offers`);

for (let y = 0; y < eventSelectedOffers.length; y++) {

  offerCount = getRandomInteger(0, 3);
  offers = new Array(offerCount).fill().map(generateOffers);

  for (let j = 0; j < offers.length; j++) {
    render(eventSelectedOffers[y], createPointOffersTemplate(offers[j]), `beforeend`);
  }
}
