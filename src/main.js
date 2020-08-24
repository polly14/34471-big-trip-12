import {getRandomInteger} from "./utils.js";
import {humanizeYearMonthDay} from "./utils.js";
import {render, RenderPosition} from "./utils.js";
import {SORTING, FILTERS} from "./const.js";
import SiteMenuView from "./view/site-menu.js";
import FilterView from "./view/filters.js";
import SortingView from "./view/sorting.js";
import FormView from "./view/form.js";
import DaysView from "./view/day.js";
import RoutePointView from "./view/route-point.js";
import PriceView from "./view/price.js";
import RouteInfoView from "./view/route-info.js";
import TripEventsMsgView from "./view/trip-events-msg.js";
import NoPointsView from "./view/no-points.js";
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

const renderPoint = (pointListElement, point, offers) => {
  const pointComponent = new RoutePointView(point, offers);
  const pointEditComponent = new FormView(point, offers);
  const replaceCardToForm = () => {
    pointListElement.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
  };
  const replaceFormToCard = () => {
    pointListElement.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
  };
  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };
  pointComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });
  pointEditComponent.getElement().addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });
  render(pointListElement, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

const tripMain = document.querySelector(`.trip-main`);
render(tripMain, new PriceView(points).getElement(), RenderPosition.AFTERBEGIN);
const tripMainTripControlsTitles = document.querySelectorAll(`h2.visually-hidden`);
render(tripMainTripControlsTitles[0], new SiteMenuView().getElement(), RenderPosition.AFTEREND);
const tripEvents = document.querySelector(`.trip-events`);
const tripMainTripInfo = document.querySelector(`.trip-main__trip-info`);
render(tripMainTripControlsTitles[1], new FilterView(FILTERS).getElement(), RenderPosition.AFTEREND);
render(tripMainTripInfo, new RouteInfoView(allDaysNew, rPoints).getElement(), RenderPosition.AFTERBEGIN);
render(tripEvents, new SortingView(SORTING).getElement(), RenderPosition.BEFOREEND);

const renderBoard = (boardContainer, boardPoints) => {
  if (allDays.length === 0) {
    render(boardContainer, new NoPointsView().getElement(), RenderPosition.BEFOREEND);
    return;
  }
  const tripSort = document.querySelector(`.trip-sort`);
  render(tripSort, new DaysView(allDaysNew).getElement(), RenderPosition.AFTEREND);
  const tripEventsList = document.querySelectorAll(`.trip-events__list`);

  for (let d = 0; d < allDays.length; d++) {
    for (let i = 0; i < boardPoints.length; i++) {
      let offerCount = getRandomInteger(2, 5);
      let offers = new Array(offerCount).fill().map(generateOffers);
      if (allDays[d] === humanizeYearMonthDay(boardPoints[i].pointStartTime)) {
        renderPoint(tripEventsList[d], boardPoints[i], offers);
      }
    }
  }
};

renderBoard(tripEvents, points);

render(tripEvents, new TripEventsMsgView().getElement(), RenderPosition.BEFOREEND);
