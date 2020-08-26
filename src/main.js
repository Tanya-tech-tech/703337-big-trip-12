import SiteMenuView from "./view/site-menu.js";
import FilterView from "./view/filter.js";
import BoardPresenter from "./presenter/board.js";
import {generateDestination} from "./mock/destinationM.js";
import {generateFilter} from "./mock/filterM.js";
import {renderElement, RenderPosition} from "./utils/render.js";

const TASK_COUNT = 20;

const destinations = new Array(TASK_COUNT).fill().map(generateDestination);
const filters = generateFilter(destinations);

const siteMainElement = document.querySelector(`.page-main`);
const siteTripMainElement = document.querySelector(`.trip-main`);
const siteTripElement = document.querySelector(`.trip-events`);
const siteTripEventsElement = siteMainElement.querySelector(`.trip-events`).querySelector(`h2:nth-child(1)`);

const siteMenuElement = siteTripMainElement.querySelector(`.trip-main__trip-controls`).querySelector(`h2:nth-child(1)`);
const siteSecondMenuElement = siteTripMainElement.querySelector(`.trip-main__trip-controls`);

const boardPresenter = new BoardPresenter(siteTripMainElement, siteTripElement, siteTripEventsElement);

renderElement(siteMenuElement, new SiteMenuView().getElement(), RenderPosition.AFTEREND);
renderElement(siteSecondMenuElement, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);

boardPresenter.init(destinations);
