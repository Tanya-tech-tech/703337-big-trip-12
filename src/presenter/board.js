import RouteView from "../view/route.js";
import CostValueView from "../view/cost-value.js";
import RouteListView from "../view/routeList.js";
import SortView from "../view/sort.js";
import DaysView from "../view/day.js";
import DaysListView from "../view/daysList.js";
import DestinationView from "../view/destination.js";
import NoDestinationView from "../view/no-destination.js";
import DestinationEditView from "../view/destination-edit.js";
import {renderElement, RenderPosition, replace} from "../utils/render.js";

import {sortPrice, sortTime} from "../utils/destinationSort.js";
import {SortType} from "../const.js";

export default class Board {
  constructor(routeContainer, tripContainer, tripEvents) {
    this._routeContainer = routeContainer;
    this._tripContainer = tripContainer;
    this._tripEvents = tripEvents;
    this._routeListComponent = new RouteView();
    this._currentSortType = SortType.DEFAULT;
    this._datesTrip = [`2019-03-18`, `2019-03-19`, `2019-03-20`];
    this._sortComponent = new SortView();
    this._routeList = new RouteListView();
    this._costValue = new CostValueView();
    this._days = new DaysView(this._datesTrip);
    this._daysSort = new DaysView(this._datesTrip);
    this._daysList = new DaysListView();
    this._noDestinationComponent = new NoDestinationView();
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._destinationsFirstDay = [];
    this._destinationsSecondDay = [];
    this._destinationsThirdDay = [];
  }

  init(boardDestinations) {
    this._boardDestinations = boardDestinations.slice();
    this._sourcedBoardDestinations = boardDestinations.slice();

    renderElement(this._routeContainer, this._routeList, RenderPosition.AFTERBEGIN);
    renderElement(this._routeList, this._costValue, RenderPosition.BEFOREEND);
    this._renderBoard();
  }

  _breakdownDays(datesTrip) {
    const arrayDate = [];

    datesTrip.forEach((it) => {
      const date = new Date(it);
      date.setHours(23, 59, 59, 999);
      arrayDate.push(date);
    });

    for (let i = 0; i < this._boardDestinations.length; i++) {
      if (this._boardDestinations[i].dueDate - arrayDate[1] === 0) {
        this._destinationsSecondDay.push(this._boardDestinations[i]);
      } else if (this._boardDestinations[i].dueDate - arrayDate[0] === 0) {
        this._destinationsFirstDay.push(this._boardDestinations[i]);
      } else {
        this._destinationsThirdDay.push(this._boardDestinations[i]);
      }
    }
  }

  _sortDestinations(sortType) {
    switch (sortType) {
      case SortType.PRICE:
        this._boardDestinations.sort(sortPrice);
        break;
      case SortType.TIME:
        this._boardDestinations.sort(sortTime);
        break;
      default:
        this._boardDestinations = this._sourcedBoardDestinations.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    // - Сортируем задачи
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortDestinations(sortType);

    if (sortType === SortType.DEFAULT) {
      const containerDefault = document.querySelector(`.trip-days`);
      containerDefault.innerHTML = ``;

      renderElement(containerDefault, new DaysView(this._datesTrip), RenderPosition.BEFOREEND);
      this._renderDestinations(this._destinationsFirstDay, this._destinationsSecondDay, this._destinationsThirdDay);
    } else {
      this._clearDestinationList();
      this._renderSortDestinations();
    }
  }

  _renderSort() {
    renderElement(this._tripEvents, this._sortComponent, RenderPosition.AFTEREND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderDays() {
    const daysContainer = document.querySelector(`.trip-days`);
    renderElement(daysContainer, this._days, RenderPosition.BEFOREEND);
  }

  _renderDaysSort() {

    const daysContainer = document.querySelector(`.trip-days`);
    renderElement(daysContainer, this._daysSort, RenderPosition.BEFOREEND);
  }

  _renderDaysList() {
    renderElement(this._tripContainer, this._daysList, RenderPosition.BEFOREEND);
  }

  _renderDestination(destinationListElement, destination) {
    const destinationComponent = new DestinationView(destination);
    const formEditComponent = new DestinationEditView(destination);

    const replaceDestinationToForm = () => {
      replace(formEditComponent, destinationComponent);
    };
    const replaceFormToDestination = () => {
      replace(destinationComponent, formEditComponent);
    };
    const onEscKeyDown = (evt) => {
      evt.preventDefault();
      if (evt.key === `Escape` || evt.key === `Esc`) {
        replaceFormToDestination();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    destinationComponent.setEditClickHandler(() => {
      replaceDestinationToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    formEditComponent.setFormSubmitHandler(()=> {
      replaceFormToDestination();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    renderElement(destinationListElement, destinationComponent, RenderPosition. BEFOREEND);
  }

  _clearDestinationList() {
    const daysContainer = document.querySelectorAll(`.trip-events__list`);
    const daysDate = document.querySelectorAll(`.day__info`);
    for (let i = 0; i < daysDate.length; i++) {
      daysDate[i].innerHTML = ``;
    }
    for (let j = 0; j < daysContainer.length; j++) {
      daysContainer[j].innerHTML = ``;
    }
  }

  _renderSortDestinations() {
    const daysContainer = document.querySelector(`.trip-events__list`);
    for (let i = 0; i < this._boardDestinations.length; i++) {
      this._renderDestination(daysContainer, this._boardDestinations[i]);
    }
  }

  _renderDestinations(firstDay, secondDay, thirdDay) {
    const siteDay = document.querySelector(`.trip-days`);
    const siteFirstDay = siteDay.querySelector(`li:nth-child(1)`).querySelector(`ul:nth-child(2)`);
    const siteSecondDay = siteDay.querySelector(`li:nth-child(2)`).querySelector(`ul:nth-child(2)`);
    const siteThirdDay = siteDay.querySelector(`li:nth-child(3)`).querySelector(`ul:nth-child(2)`);

    for (let i = 0; i < firstDay.length; i++) {
      this._renderDestination(siteFirstDay, firstDay[i]);
    }
    for (let i = 0; i < secondDay.length; i++) {
      this._renderDestination(siteSecondDay, secondDay[i]);
    }
    for (let i = 0; i < thirdDay.length; i++) {
      this._renderDestination(siteThirdDay, thirdDay[i]);
    }
  }

  _renderNoDestinations() {
    renderElement(this._tripEvents, this._noDestinationComponent, RenderPosition.AFTEREND);
  }

  _renderRoute() {
    renderElement(this._routeList, this._routeListComponent, RenderPosition.AFTERBEGIN);
  }

  _renderBoard() {
    this._breakdownDays(this._datesTrip);

    if (this._boardDestinations.every((destination) => !destination.destination)) {
      this._renderNoDestinations();
      return;
    }
    this._renderRoute();
    this._renderSort();
    this._renderDaysList();
    this._renderDays();
    this._renderDestinations(this._destinationsFirstDay, this._destinationsSecondDay, this._destinationsThirdDay);
  }
}
