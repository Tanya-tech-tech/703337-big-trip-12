import {сreateSiteMenuTemplate} from "./view/site-menu.js";
import {сreateSiteRouteTemplate} from "./view/route.js";
import {createFilterTemplate} from "./view/filter.js";
import {createSortTemplate} from "./view/sort.js";
import {createDayTemplate} from "./view/day.js";
import {createDestinationTemplate} from "./view/destination.js";
import {createFormEditTemplate} from "./view/destination-edit.js";

const TASK_COUNT = 3;

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
render(siteMenuElement, сreateSiteMenuTemplate(), `afterend`);
render(siteSecondMenuElement, createFilterTemplate(), `beforeend`);


render(siteTripEventsElement, createSortTemplate(), `afterend`);

render(siteTripElement, createDayTemplate(), `beforeend`);

const siteDayElement = document.querySelector(`.trip-days`);
const siteTripListElement = document.querySelector(`.trip-events__list`);
render(siteDayElement, createFormEditTemplate(), `beforebegin`);

for (let i = 0; i < TASK_COUNT; i++) {
  render(siteTripListElement, createDestinationTemplate(), `afterbegin`);
}


