import {SortType} from "../const.js";
import SortingView from "../view/sorting.js";
import FormView from "../view/form.js";
import DaysView from "../view/days.js";
import DayView from "../view/day.js";
import DayInfoView from "../view/day-info.js";
import DayListView from "../view/day-list.js";
import RoutePointView from "../view/route-point.js";
import TripEventsMsgView from "../view/trip-events-msg.js";
import NoPointsView from "../view/no-points.js";
import {sortPointTimeChange, sortPointPriceChange} from "../utils/point.js";
import {getRandomInteger} from "../utils/common.js";
import {humanizeYearMonthDay} from "../utils/point.js";
import {render, RenderPosition, replace} from "../utils/render.js";

export default class Trip {
  constructor(boardContainer, allDays, allDaysNew, generateOffers) {
    this._currentSortType = SortType.DEFAULT;
    this._boardContainer = boardContainer;
    this._daysComponent = new DaysView();
    this._tripEventsMsgComponent = new TripEventsMsgView();
    this._noPointsComponent = new NoPointsView();
    this._allDays = allDays;
    this._allDaysNew = allDaysNew;
    this._generateOffers = generateOffers;
    this._sortComponent = new SortingView();
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

  }

  init(boardPoints) {

    if (this._allDays.length !== 0) {
      this._renderSort();
    }

    this._boardPoints = boardPoints.slice();

    this._sourcedBoardPoints = boardPoints.slice();

    render(this._boardContainer, this._daysComponent, RenderPosition.BEFOREEND);
    this._renderBoard();
  }

  _sortPoints(sortType) {

    switch (sortType) {
      case SortType.TIME:
        this._boardPoints.sort(sortPointTimeChange);
        break;
      case SortType.PRICE:
        this._boardPoints.sort(sortPointPriceChange);
        break;
      default:
        this._boardPoints = this._sourcedBoardPoints.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {

    if (this._currentSortType === sortType) {
      return;
    }

    this._sortPoints(sortType);
    this._clearPointsList();
    if (sortType === `event`) {
      this._renderDays();
    } else {
      this._renderPointsList();
    }
  }

  _renderSort() {

    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderPoint(pointListElement, point, offers) {
    const pointComponent = new RoutePointView(point, offers);
    const pointEditComponent = new FormView(point, offers);
    const replaceCardToForm = () => {
      replace(pointEditComponent, pointComponent);
    };
    const replaceFormToCard = () => {
      replace(pointComponent, pointEditComponent);
    };
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };
    pointComponent.setEditClickHandler(() => {
      replaceCardToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });
    pointEditComponent.setFormSubmitHandler(() => {
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });
    render(pointListElement, pointComponent, RenderPosition.BEFOREEND);
  }

  _renderDays() {

    this._allDays
      .slice(0, this._allDays.length)
      .forEach((everyDay) => {
        const dayDate = this._allDaysNew[this._allDays.indexOf(everyDay)];
        const dayComponent = new DayView();
        render(this._daysComponent, dayComponent, RenderPosition.BEFOREEND);
        const dayInfoComponent = new DayInfoView(dayDate, this._allDays);
        render(dayComponent, dayInfoComponent, RenderPosition.BEFOREEND);
        const dayListComponent = new DayListView();
        render(dayComponent, dayListComponent, RenderPosition.BEFOREEND);
        this._boardPoints
        .slice(0, this._boardPoints.length)
        .forEach((boardPoint) => {

          let offerCount = getRandomInteger(2, 5);
          let offers = new Array(offerCount).fill().map(this._generateOffers);
          if (everyDay === humanizeYearMonthDay(boardPoint.pointStartTime)) {
            this._renderPoint(dayListComponent, boardPoint, offers);
          }
        });
      });
  }

  _clearPointsList() {
    this._daysComponent.getElement().innerHTML = ``;
  }

  _renderPointsList() {
    const dayComponent = new DayView();
    render(this._daysComponent, dayComponent, RenderPosition.BEFOREEND);
    const dayInfoComponent = new DayInfoView(0, this._allDays);
    render(dayComponent, dayInfoComponent, RenderPosition.BEFOREEND);
    dayInfoComponent.getElement().innerHTML = ``;
    const dayListComponent = new DayListView();
    render(dayComponent, dayListComponent, RenderPosition.BEFOREEND);
    this._boardPoints
    .slice(0, this._boardPoints.length)
    .forEach((boardPoint) => {
      let offerCount = getRandomInteger(2, 5);
      let offers = new Array(offerCount).fill().map(this._generateOffers);
      this._renderPoint(dayListComponent, boardPoint, offers);
    });

  }

  _renderTripEventsMsg() {
    render(this._boardContainer, this._tripEventsMsgComponent, RenderPosition.BEFOREEND);
  }

  _renderNoPoints() {
    render(this._boardContainer, this._noPointsComponent, RenderPosition.BEFOREEND);
  }

  _renderBoard() {

    if (this._allDays.length === 0) {
      this._renderNoPoints();
      return;
    }
    this._renderDays();

    this._renderTripEventsMsg();
  }
}
