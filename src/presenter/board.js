import RouteView from "../view/route.js";
import CostValueView from "../view/cost-value.js";
import RouteListView from "../view/routeList.js";
import SortView from "../view/sort.js";
import DaysView from "../view/day.js";
import DestinationsListView from "../view/containerDestinationInDay.js";
import {quantityDays} from "../view/day.js";
import SortContainerView from "../view/destinationsSortContainer.js";
import DaysListView from "../view/daysList.js";
import DestinationPresenter from "./destinationP.js";
import PointNewPresenter from "./point-newP.js";
import {datesArray} from "../main.js";

import NoDestinationView from "../view/no-destination.js";
import {renderElement, RenderPosition, remove} from "../utils/render.js";
import {sortPrice, sortTime} from "../utils/destinationSort.js";
import {filterPoint} from "../utils/filterU.js";
import {SortType, UpdateType, UserAction, FilterType} from "../const.js";

export default class Board {
  constructor(routeContainer, tripContainer, tripEvents, pointsModel, filterModel) {
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._routeContainer = routeContainer;
    this._tripContainer = tripContainer;
    this._tripEvents = tripEvents;
    this._routeListComponent = new RouteView();
    this._currentSortType = SortType.DEFAULT;
    this._datesTrip = datesArray;

    this._destinationPresenter = {};

    this._sortComponent = null;
    this._sortContainer = new SortContainerView();
    this._routeList = new RouteListView();
    this._costValue = new CostValueView();

    this._days = new DaysView(this._pointsModel.getPoints());
    this._daysList = new DaysListView();
    this._destinationList = new DestinationsListView();
    this._noDestinationComponent = new NoDestinationView();

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    // this._pointsModel.addObserver(this._handleModelEvent);
    // this._filterModel.addObserver(this._handleModelEvent);

    this._pointListComponent = null;
    this._pointNewPresenter = new PointNewPresenter(this._daysList.getElement(), this._handleViewAction);
  }

  init() {
    renderElement(this._routeContainer, this._routeList, RenderPosition.AFTERBEGIN);
    renderElement(this._routeList, this._costValue, RenderPosition.BEFOREEND);
    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._renderBoard();
  }

  destroy() {
    this._clearBoard({resetRenderedTaskCount: true, resetSortType: true});
    remove(this._destinationList);


    this._pointsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createPoint(callback) {
    this._currentSortType = SortType.DEFAULT;
    this._pointListComponent = this._sortComponent.getElement();

    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._pointNewPresenter.init(callback);
  }

  _getPoints() {
    // const filterType = this._filterModel.getFilter(); // активный фильтр
    // const points = this._pointsModel.getPoints(); // массив точек
    switch (this._currentSortType) {
      case SortType.PRICE:
        return this._pointsModel.getPoints().slice().sort(sortPrice);
      case SortType.TIME:
        return this._pointsModel.getPoints().slice().sort(sortTime);
    }
    return this._pointsModel.getPoints();
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;

    if (sortType === SortType.DEFAULT) {
      this._clearBoard();
      this._renderDays();
      this._renderDestinations();
    } else {
      this._clearBoard();
      this._renderSortDestinations();
    }
  }

  _renderSortDestinations() {
    const pointsSorted = this._getPoints();

    this._renderSortContainer();
    const daysContainer = document.querySelector(`.trip-events__list`);
    for (let i = 0; i < pointsSorted.length; i++) {
      this._renderDestination(daysContainer, pointsSorted[i]);
    }
  }

  _renderSortContainer() {
    renderElement(this._daysList.getElement(), this._sortContainer, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }
    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    renderElement(this._tripEvents, this._sortComponent, RenderPosition.AFTEREND);
  }

  _renderDays() {
    const daysContainer = document.querySelector(`.trip-days`);
    renderElement(daysContainer, this._days, RenderPosition.BEFOREEND);
  }

  _renderDaysList() {
    renderElement(this._tripContainer, this._daysList, RenderPosition.BEFOREEND);
  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();
    Object
      .values(this._destinationPresenter)
      .forEach((presenter) => presenter.resetView()); // все формы на карту
  }

  _handleViewAction(actionType, updateType, update) {
    // console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this._destinationPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        this._clearBoard({resetSortType: true});
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
      // - обновить всю доску (например, при переключении фильтра)
        this._clearBoard({resetSortType: true});
        this._renderBoard({isFilter: true});
        break;
    }
  }

  _renderDestination(destinationListComponent, destination) {
    const destinationPresenter = new DestinationPresenter(destinationListComponent, this._handleViewAction, this._handleModeChange);
    destinationPresenter.init(destination);
    this._destinationPresenter[destination.id] = destinationPresenter;

  }

  _renderDestinations() {
    let containers = this._days.getElement().querySelectorAll(`li`);
    for (let i = 0; i < quantityDays.length; i++) {
      quantityDays[i].forEach((it) => this._renderDestination(containers[i]
        .querySelector(`ul:nth-child(2)`), it));
    }
  }

  _renderNoDestinations() {
    renderElement(this._tripEvents, this._noDestinationComponent, RenderPosition.AFTEREND);
  }

  _renderRoute() {
    renderElement(this._routeList, this._routeListComponent, RenderPosition.AFTERBEGIN);
  }

  _clearBoard({resetSortType = false} = {}) {
    this._pointNewPresenter.destroy();
    Object
      .values(this._destinationPresenter)
      .forEach((presenter) => presenter.destroy());
    this._destinationPresenter = {};
    remove(this._days);

    remove(this._noDestinationComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
      remove(this._sortComponent);

      this._pointNewPresenter.destroy();
      Object
      .values(this._destinationPresenter)
      .forEach((presenter) => presenter.destroy());
      this._destinationPresenter = {};
      remove(this._days);
      remove(this._noDestinationComponent);
    }
  }

  _renderBoard({isFilter = false} = {}) {

    const points = this._pointsModel.getPoints();
    const pointCount = points.length;

    if (pointCount === 0) {
      this._renderNoDestinations();
      return;
    }
    this._renderRoute();
    this._renderSort();
    this._renderDaysList();
    this._days = new DaysView(this._pointsModel.getPoints());
    this._renderDays();
    this._renderDestinations();

    if (isFilter) {
      this._clearBoard();
      this._renderDaysList();
      const filterType = this._filterModel.getFilter(); // активный фильтр
      let filteredDestination = filterPoint[filterType](points);
      this._days = new DaysView(filteredDestination);

      this._renderDays();
      this._renderDestinations();
    }
  }
}
