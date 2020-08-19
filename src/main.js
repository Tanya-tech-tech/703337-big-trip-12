import SiteMenuView from "./view/site-menu.js";
import RouteView from "./view/route.js";
import FilterView from "./view/filter.js";
import SortView from "./view/sort.js";
import DaysView from "./view/day.js";
import DestinationView from "./view/destination.js";
import DestinationEditView from "./view/destination-edit.js";
import {generateDestination} from "./mock/destinationM.js";

import {generateFilter} from "./mock/filterM.js";
import {renderElement, RenderPosition} from "./utils.js";

const TASK_COUNT = 20;

const renderDestination = (destinationListElement, destination) => {
  const destinationComponent = new DestinationView(destination);
  const formEditComponent = new DestinationEditView(destination);

  const replaceDestinationToForm = () => {
    destinationListElement.replaceChild(formEditComponent.getElement(), destinationComponent.getElement());
  };

  destinationComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceDestinationToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToDestination();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replaceFormToDestination = () => {
    destinationListElement.replaceChild(destinationComponent.getElement(), formEditComponent.getElement());
  };

  formEditComponent.getElement().addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToDestination();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  renderElement(destinationListElement, destinationComponent.getElement(), RenderPosition.AFTERBEGIN);
};

const destinations = new Array(TASK_COUNT).fill().map(generateDestination);
const filters = generateFilter(destinations);

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

for (let i = 0; i < destinations.length; i++) {
  if (destinations[i].dueDate - arrayDate[1] === 0) {
    destinationsSecondDay.push(destinations[i]);
  } else if (destinations[i].dueDate - arrayDate[0] === 0) {
    destinationsThirdDay.push(destinations[i]);
  } else {
    destinationsFirstDay.push(destinations[i]);
  }
}

const siteTripMainElement = document.querySelector(`.trip-main`);
const siteMenuElement = siteTripMainElement.querySelector(`.trip-main__trip-controls`).querySelector(`h2:nth-child(1)`);
const siteSecondMenuElement = siteTripMainElement.querySelector(`.trip-main__trip-controls`);

const siteMainElement = document.querySelector(`.page-main`);
const siteTripElement = document.querySelector(`.trip-events`);
const siteTripEventsElement = siteMainElement.querySelector(`.trip-events`).querySelector(`h2:nth-child(1)`);

renderElement(siteTripMainElement, new RouteView().getElement(), RenderPosition.AFTERBEGIN);
renderElement(siteMenuElement, new SiteMenuView().getElement(), RenderPosition.AFTEREND);
renderElement(siteSecondMenuElement, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);


renderElement(siteTripEventsElement, new SortView().getElement(), RenderPosition.AFTEREND);

renderElement(siteTripElement, new DaysView().getElement(), RenderPosition.BEFOREEND);

const siteDayElement = document.querySelector(`.trip-days`);
const siteSecondDay = siteDayElement.querySelector(`li:nth-child(2)`);
const siteThirdDay = siteDayElement.querySelector(`li:nth-child(3)`);

const siteTripListFirstElement = siteDayElement.querySelector(`.trip-events__list`);
const siteTripListSecondElement = siteSecondDay.querySelector(`ul:nth-child(2)`);
const siteTripListThirdElement = siteThirdDay.querySelector(`ul:nth-child(2)`);

for (let i = 0; i < destinationsFirstDay.length; i++) {
  renderDestination(siteTripListFirstElement, destinationsFirstDay[i]);
}

for (let i = 0; i < destinationsSecondDay.length; i++) {
  renderDestination(siteTripListSecondElement, destinationsSecondDay[i]);
}

for (let i = 0; i < destinationsThirdDay.length; i++) {
  renderDestination(siteTripListThirdElement, destinationsThirdDay[i]);
}

