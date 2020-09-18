import {SortType, UpdateType, UserAction, FilterType} from "../const.js";
import SortingView from "../view/sorting.js";
import DaysView from "../view/days.js";
import DayView from "../view/day.js";
import DayInfoView from "../view/day-info.js";
import DayListView from "../view/day-list.js";
import TripEventsMsgView from "../view/trip-events-msg.js";
import NoPointsView from "../view/no-points.js";
import {sortPointTimeChange, sortPointPriceChange, sortDefault} from "../utils/point.js";
import {humanizeYearMonthDay} from "../utils/point.js";
import PointPresenter from "./point.js";
import PointNewPresenter from "./point-new.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {filter} from "../utils/filter.js";

export default class Trip {
  constructor(boardContainer, pointsModel, filterModel) {
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._currentSortType = SortType.DEFAULT;
    this._boardContainer = boardContainer;
    this._daysComponent = new DaysView();
    this._tripEventsMsgComponent = new TripEventsMsgView();
    this._noPointsComponent = new NoPointsView();
    this._sortComponent = null;
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._pointPresenter = {};
    this._dayPresenter = [];
    this._dayInfoPresenter = [];
    this._dayListPresenter = [];
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._pointNewPresenter = new PointNewPresenter(this._boardContainer, this._handleViewAction);
  }

  init() {
    const points = this._getPoints();
    const pointCount = points.length;


    if (pointCount !== 0) {
      this._renderSort();
    }

    render(this._boardContainer, this._daysComponent, RenderPosition.BEFOREEND);
    this._renderBoard();
  }

  createPoint() {
    this._currentSortType = SortType.DEFAULT;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._pointNewPresenter.init();
  }

  _getPoints() {

    const filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filteredPoints = filter[filterType](points);

    switch (this._currentSortType) {
      case SortType.DEFAULT:
        return filteredPoints.sort(sortDefault);
      case SortType.TIME:
        return filteredPoints.sort(sortPointTimeChange);
      case SortType.PRICE:
        return filteredPoints.sort(sortPointPriceChange);
    }
    return filteredPoints;
  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        if (this._currentSortType !== `event`) {
          this._renderListWithoutDays();
        } else {
          this._renderBoard();
        }

        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetSortType: true});
        this._renderBoard();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    if (sortType === `event`) {
      this._clearBoard();
      this._renderBoard();
    } else {
      this._clearBoard();
      this._renderListWithoutDays();
    }
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }
    this._sortComponent = new SortingView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._boardContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(point, pointListElement) {
    const pointPresenter = new PointPresenter(pointListElement, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _clearBoard({resetSortType = false} = {}) {
    this._pointNewPresenter.destroy();
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
    this._dayPresenter.forEach((dayComponent) => remove(dayComponent));
    this._dayPresenter = [];
    this._dayInfoPresenter.forEach((dayInfoComponent) => remove(dayInfoComponent));
    this._dayInfoPresenter = [];
    this._dayListPresenter.forEach((dayListComponent) => remove(dayListComponent));
    this._dayListPresenter = [];
    remove(this._noPointsComponent);
    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderTripEventsMsg() {
    render(this._boardContainer, this._tripEventsMsgComponent, RenderPosition.BEFOREEND);
  }

  _renderNoPoints() {
    render(this._boardContainer, this._noPointsComponent, RenderPosition.BEFOREEND);
  }

  _renderListWithoutDays() {
    const points = this._getPoints();
    const dayInfoComponent = new DayInfoView(0, 0);
    const dayComponent = new DayView();
    render(this._daysComponent, dayComponent, RenderPosition.BEFOREEND);
    this._dayPresenter.push(dayComponent);
    render(dayComponent, dayInfoComponent, RenderPosition.BEFOREEND);
    this._dayInfoPresenter.push(dayInfoComponent);
    const dayListComponent = new DayListView();
    this._dayListPresenter.push(dayListComponent);
    render(dayComponent, dayListComponent, RenderPosition.BEFOREEND);
    dayInfoComponent.getElement().innerHTML = ``;
    points.forEach((point) => {
      this._renderPoint(point, dayListComponent);
    });
  }

  _renderBoard() {
    const points = this._getPoints();
    const pointCount = points.length;
    if (pointCount === 0) {
      this._renderNoPoints();
      return;
    }

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
    for (let a = 0; a < pointCount; a++) {
      humDays.push(humanizeYearMonthDay(points[a].pointStartTime));
    }
    const uniqueDays = new Set(humDays);
    const allDays = Array.from(uniqueDays);
    const allDaysNew = [];
    for (let u = 0; u < allDays.length; u++) {
      allDaysNew.push(allDays[u].split(` `));
    }

    allDays
      .slice(0, allDays.length)
      .forEach((everyDay) => {
        const dayDate = allDaysNew[allDays.indexOf(everyDay)];
        const dayInfoComponent = new DayInfoView(dayDate, allDays.indexOf(everyDay) + 1);
        const dayComponent = new DayView();
        render(this._daysComponent, dayComponent, RenderPosition.BEFOREEND);
        this._dayPresenter.push(dayComponent);
        render(dayComponent, dayInfoComponent, RenderPosition.BEFOREEND);
        this._dayInfoPresenter.push(dayInfoComponent);
        const dayListComponent = new DayListView();
        this._dayListPresenter.push(dayListComponent);
        render(dayComponent, dayListComponent, RenderPosition.BEFOREEND);
        points.forEach((point) => {
          if (everyDay === humanizeYearMonthDay(point.pointStartTime)) {
            this._renderPoint(point, dayListComponent);
          }
        });
      });

    this._renderTripEventsMsg();
  }
}
