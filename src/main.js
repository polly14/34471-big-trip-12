import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createFilterTemplate} from "./view/filters.js";
import {createSortingTemplate} from "./view/sorting.js";
import {createFormTemplate} from "./view/form.js";
import {createFormDetails} from "./view/form-details.js";
import {createFormDestination} from "./view/form-destination.js";
import {createDayTemplate} from "./view/day.js";
import {createRoutePointTemplate} from "./view/route-point.js";
import {createPriceTemplate} from "./view/price.js";
import {createRouteInfoTemplate} from "./view/route-info.js";
import {createTripEventsMsgTemplate} from "./view/trip-events-msg.js";

const TASK_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripMain = document.querySelector(`.trip-main`);
render(tripMain, createPriceTemplate(), `afterbegin`);

const tripMainTripInfo = document.querySelector(`.trip-main__trip-info`);
render(tripMainTripInfo, createRouteInfoTemplate(), `afterbegin`);

const tripMainTripControlsTitles = document.querySelectorAll(`h2.visually-hidden`);
render(tripMainTripControlsTitles[0], createSiteMenuTemplate(), `afterend`);
render(tripMainTripControlsTitles[1], createFilterTemplate(), `afterend`);

const tripEvents = document.querySelector(`.trip-events`);
render(tripEvents, createSortingTemplate(), `beforeend`);
render(tripEvents, createDayTemplate(), `beforeend`);
render(tripEvents, createTripEventsMsgTemplate(), `beforeend`);

const tripDays = document.querySelector(`.trip-days`);
render(tripDays, createFormTemplate(), `beforebegin`);

const eventHeader = document.querySelector(`.event__header`);
render(eventHeader, createFormDetails(), `afterend`);

const eventDetails = document.querySelector(`.event__details`);
render(eventDetails, createFormDestination(), `beforeend`);

const tripEventsList = document.querySelector(`.trip-events__list`);
for (let i = 0; i < TASK_COUNT; i++) {
  render(tripEventsList, createRoutePointTemplate(), `beforeend`);
}
