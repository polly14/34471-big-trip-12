import {humanizeYearMonthDay} from "./utils/point.js";
import {render, RenderPosition} from "./utils/render.js";
import {FILTERS} from "./const.js";

import TripPresenter from "./presenter/trip.js";

import SiteMenuView from "./view/site-menu.js";
import FilterView from "./view/filters.js";
import PriceView from "./view/price.js";
import RouteInfoView from "./view/route-info.js";

import {generateRoutePoint} from "./mock/route-point.js";
import {generateOffers} from "./mock/point-offers.js";

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

const tripMain = document.querySelector(`.trip-main`);
render(tripMain, new PriceView(points), RenderPosition.AFTERBEGIN);
const tripMainTripControlsTitles = document.querySelectorAll(`h2.visually-hidden`);
render(tripMainTripControlsTitles[0], new SiteMenuView(), RenderPosition.AFTEREND);
const tripMainTripInfo = document.querySelector(`.trip-main__trip-info`);
render(tripMainTripControlsTitles[1], new FilterView(FILTERS), RenderPosition.AFTEREND);
if (allDays.length !== 0) {
  render(tripMainTripInfo, new RouteInfoView(allDaysNew, rPoints), RenderPosition.AFTERBEGIN);
}

const tripEvents = document.querySelector(`.trip-events`);

const boardPresenter = new TripPresenter(tripEvents, allDays, allDaysNew, generateOffers);
boardPresenter.init(points);
