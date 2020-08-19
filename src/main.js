import {getRandomInteger} from "./utils.js";
import {humanizeYearMonthDay} from "./utils.js";
import {render, RenderPosition} from "./utils.js";
import {SORTING, FILTERS} from "./const.js";
import SiteMenuView from "./view/site-menu.js";
import FilterView from "./view/filters.js";
import SortingView from "./view/sorting.js";
import FormView from "./view/form.js";
import FormDetailsView from "./view/form-details.js";
import FormDestinationView from "./view/form-destination.js";
import FormPhotosView from "./view/form-photos.js";
import DaysView from "./view/day.js";
import RoutePointView from "./view/route-point.js";
import PointOffersView from "./view/point-offers.js";
import PriceView from "./view/price.js";
import RouteInfoView from "./view/route-info.js";
import TripEventsMsgView from "./view/trip-events-msg.js";
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


const renderPoint = (pointListElement, point) => {
  const pointComponent = new RoutePointView(point);
  const pointEditComponent = new FormView(point);

  const replaceCardToForm = () => {
    pointListElement.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
  };

  const replaceFormToCard = () => {
    pointListElement.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
  };

  pointComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceCardToForm();

    const eventHeader = document.querySelector(`.event__header`);
    let offerCount = getRandomInteger(2, 5);
    let offers = new Array(offerCount).fill().map(generateOffers);
    render(eventHeader, new FormDetailsView(offers).getElement(), RenderPosition.AFTEREND);

    const eventDetails = document.querySelector(`.event__details`);
    render(eventDetails, new FormDestinationView(points[0]).getElement(), RenderPosition.BEFOREEND);

    const eventPhotosTape = document.querySelector(`.event__photos-tape`);
    const photoCount = getRandomInteger(3, 8);
    const photos = new Array(photoCount).fill().map(generatePhotos);
    for (let i = 0; i < photos.length; i++) {
      render(eventPhotosTape, new FormPhotosView(photos[i]).getElement(), RenderPosition.BEFOREEND);
    }

  });

  pointEditComponent.getElement().addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
  });

  render(pointListElement, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

const tripMain = document.querySelector(`.trip-main`);
render(tripMain, new PriceView(points).getElement(), RenderPosition.AFTERBEGIN);

const tripMainTripInfo = document.querySelector(`.trip-main__trip-info`);
render(tripMainTripInfo, new RouteInfoView(allDaysNew, rPoints).getElement(), RenderPosition.AFTERBEGIN);

const tripMainTripControlsTitles = document.querySelectorAll(`h2.visually-hidden`);
render(tripMainTripControlsTitles[0], new SiteMenuView().getElement(), RenderPosition.AFTEREND);
render(tripMainTripControlsTitles[1], new FilterView(FILTERS).getElement(), RenderPosition.AFTEREND);

const tripEvents = document.querySelector(`.trip-events`);
render(tripEvents, new SortingView(SORTING).getElement(), RenderPosition.BEFOREEND);

const tripSort = document.querySelector(`.trip-sort`);

render(tripEvents, new TripEventsMsgView().getElement(), RenderPosition.BEFOREEND);

render(tripSort, new DaysView(allDaysNew).getElement(), RenderPosition.AFTEREND);

// const tripDays = document.querySelector(`.trip-days`);
// render(tripDays, new FormView(points[0]).getElement(), RenderPosition.BEFOREBEGIN);


const tripEventsList = document.querySelectorAll(`.trip-events__list`);

for (let d = 0; d < allDays.length; d++) {
  for (let i = 0; i < points.length; i++) {
    if (allDays[d] === humanizeYearMonthDay(points[i].pointStartTime)) {
      renderPoint(tripEventsList[d], points[i]);
    }
  }
}

const eventSelectedOffers = document.querySelectorAll(`.event__selected-offers`);

for (let y = 0; y < eventSelectedOffers.length; y++) {

  let offerCount = getRandomInteger(0, 3);
  let offers = new Array(offerCount).fill().map(generateOffers);

  for (let j = 0; j < offers.length; j++) {
    render(eventSelectedOffers[y], new PointOffersView(offers[j]).getElement(), RenderPosition.BEFOREEND);
  }
}
