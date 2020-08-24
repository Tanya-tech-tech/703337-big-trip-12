import RouteView from "../view/route.js";
import CostValueView from "../view/cost-value.js";
import RouteListView from "../view/routeList.js";
import SortView from "../view/sort.js";
import DaysView from "../view/day.js";
import DestinationView from "../view/destination.js";
import NoDestinationView from "../view/no-destination.js";
import DestinationEditView from "../view/destination-edit.js";
import {renderElement, RenderPosition, replace} from "../utils/render.js";

export default class Board {
  constructor(routeContainer, tripContainer, tripEvents) {
    this._routeContainer = routeContainer;
    this._tripContainer = tripContainer;
    this._tripEvents = tripEvents;
    this._routeListComponent = new RouteView();
    this._sortComponent = new SortView();
    this._routeList = new RouteListView();
    this._costValue = new CostValueView();
    this._days = new DaysView();
    this._noDestinationComponent = new NoDestinationView();
  }

  init(boardDestinations) {
    this._boardDestinations = boardDestinations.slice();
    renderElement(this._routeContainer, this._routeList, RenderPosition.AFTERBEGIN);
    renderElement(this._routeList, this._costValue, RenderPosition.BEFOREEND);
    this._renderBoard();
  }

  _renderSort() {
    renderElement(this._tripEvents, this._sortComponent, RenderPosition.AFTEREND);
  }

  _renderDays() {
    renderElement(this._tripContainer, this._days, RenderPosition.BEFOREEND);
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
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
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

    renderElement(destinationListElement, destinationComponent, RenderPosition.AFTERBEGIN);
  }

  _renderDestinations(firstDay, secondDay, thirdDay) {
    const siteDay = document.querySelector(`.trip-days`);
    const siteFirstDay = siteDay.querySelector(`.trip-events__list`);
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
    const datesTrip = [`2019-03-20`, `2019-03-19`, `2019-03-18`];
    const arrayDate = [];

    datesTrip.forEach((it) => {
      const date = new Date(it);
      date.setHours(23, 59, 59, 999);
      arrayDate.push(date);
    });

    const destinationsFirstDay = [];
    const destinationsSecondDay = [];
    const destinationsThirdDay = [];

    for (let i = 0; i < this._boardDestinations.length; i++) {
      if (this._boardDestinations[i].dueDate - arrayDate[1] === 0) {
        destinationsSecondDay.push(this._boardDestinations[i]);
      } else if (this._boardDestinations[i].dueDate - arrayDate[0] === 0) {
        destinationsThirdDay.push(this._boardDestinations[i]);
      } else {
        destinationsFirstDay.push(this._boardDestinations[i]);
      }
    }

    if (this._boardDestinations.every((destination) => !destination.destination)) {
      this._renderNoDestinations();
      return;
    }
    this._renderRoute();
    this._renderSort();
    this._renderDays();

    this._renderDestinations(destinationsFirstDay, destinationsSecondDay, destinationsThirdDay);
  }
}
