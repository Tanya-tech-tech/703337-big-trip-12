import {сreateSiteMenuTemplate} from "./view/site-menu.js";
import {сreateSiteRouteTemplate} from "./view/route.js";
import {createFilterTemplate} from "./view/filter.js";
import {createSortTemplate} from "./view/sort.js";
import {createDayTemplate} from "./view/day.js";
import {createDestinationTemplate} from "./view/destination.js";
import {createFormEditTemplate} from "./view/destination-edit.js";
import {generateDestination} from "./mock/destinationM.js";

import {generateFilter} from "./mock/filterM.js";

const TASK_COUNT = 20;

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
    destinationsFirstDay.push(destinations[i]);
  } else {
    destinationsThirdDay.push(destinations[i]);
  }
}

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteTripMainElement = document.querySelector(`.trip-main`);
const siteMenuElement = siteTripMainElement.querySelector(`.trip-main__trip-controls`).querySelector(`h2:nth-child(1)`);
const siteSecondMenuElement = siteTripMainElement.querySelector(`.trip-main__trip-controls`);

const siteMainElement = document.querySelector(`.page-main`);
const siteTripElement = document.querySelector(`.trip-events`);
const siteTripEventsElement = siteMainElement.querySelector(`.trip-events`).querySelector(`h2:nth-child(1)`);

render(siteTripMainElement, сreateSiteRouteTemplate(), `afterbegin`);
render(siteMenuElement, сreateSiteMenuTemplate(filters), `afterend`);
render(siteSecondMenuElement, createFilterTemplate(filters), `beforeend`);


render(siteTripEventsElement, createSortTemplate(), `afterend`);

render(siteTripElement, createDayTemplate(), `beforeend`);

const siteDayElement = document.querySelector(`.trip-days`);
const siteSecondDay = siteDayElement.querySelector(`li:nth-child(2)`);
const siteThirdDay = siteDayElement.querySelector(`li:nth-child(3)`);
const siteTripListFirstElement = siteDayElement.querySelector(`.trip-events__list`);

const siteTripListSecondElement = siteSecondDay.querySelector(`ul:nth-child(2)`);
const siteTripListThirdElement = siteThirdDay.querySelector(`ul:nth-child(2)`);

render(siteDayElement, createFormEditTemplate(destinations[0]), `beforebegin`);

for (let i = 1; i < destinationsFirstDay.length; i++) {
  render(siteTripListFirstElement, createDestinationTemplate(destinationsFirstDay[i]), `afterbegin`);
}

for (let i = 0; i < destinationsSecondDay.length; i++) {
  render(siteTripListSecondElement, createDestinationTemplate(destinationsSecondDay[i]), `afterbegin`);
}

for (let i = 0; i < destinationsThirdDay.length; i++) {
  render(siteTripListThirdElement, createDestinationTemplate(destinationsThirdDay[i]), `afterbegin`);
}


