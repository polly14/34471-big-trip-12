import {SortType} from "../const.js";
import SortingView from "../view/sorting.js";
import DaysView from "../view/days.js";
import DayView from "../view/day.js";
import DayInfoView from "../view/day-info.js";
import DayListView from "../view/day-list.js";
import TripEventsMsgView from "../view/trip-events-msg.js";
import NoPointsView from "../view/no-points.js";
import {sortPointTimeChange, sortPointPriceChange} from "../utils/point.js";
import {humanizeYearMonthDay} from "../utils/point.js";
import PointPresenter from "./point.js";
import {render, RenderPosition} from "../utils/render.js";
import {updateItem} from "../utils/common.js";

export default class Trip {
  constructor(boardContainer, allDays, allDaysNew) {
    this._currentSortType = SortType.DEFAULT;
    this._boardContainer = boardContainer;
    this._daysComponent = new DaysView();
    this._tripEventsMsgComponent = new TripEventsMsgView();
    this._noPointsComponent = new NoPointsView();
    this._allDays = allDays;
    this._allDaysNew = allDaysNew;
    this._sortComponent = new SortingView();
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._pointPresenter = {};
    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
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

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._boardPoints = updateItem(this._boardPoints, updatedPoint);
    this._sourcedBoardPoints = updateItem(this._sourcedBoardPoints, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);

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

  _renderPoint(point, pointListElement) {
    const pointPresenter = new PointPresenter(pointListElement, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
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
          if (everyDay === humanizeYearMonthDay(boardPoint.pointStartTime)) {
            this._renderPoint(boardPoint, dayListComponent);
          }
        });
      });
  }

  _clearPointsList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};

    this._daysComponent.getElement().innerHTML = ``;

  }

  _renderPointsList() {
    const dayComponent = new DayView();
    render(this._daysComponent, dayComponent, RenderPosition.BEFOREEND);
    const dayInfoComponent = new DayInfoView(0, 0);
    render(dayComponent, dayInfoComponent, RenderPosition.BEFOREEND);
    dayInfoComponent.getElement().innerHTML = ``;
    const dayListComponent = new DayListView();
    render(dayComponent, dayListComponent, RenderPosition.BEFOREEND);
    this._boardPoints
    .slice(0, this._boardPoints.length)
    .forEach((boardPoint) => {
      this._renderPoint(boardPoint, dayListComponent);
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
