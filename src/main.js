import SiteMenuView from "./view/site-menu.js";
import FilterView from "./view/filter.js";
import BoardPresenter from "./presenter/board.js";
import FilterPresenter from "./presenter/filterP.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filterModel.js";
import {generateDestination} from "./mock/destinationM.js";
//import {generateFilter} from "./mock/filterM.js";
import {renderElement, RenderPosition} from "./utils/render.js";

const TASK_COUNT = 4;

const destinations = new Array(TASK_COUNT).fill().map(generateDestination);
export const datesArray = destinations.slice();
const pointsModel = new PointsModel();
pointsModel.setPoints(destinations);

const filterModel = new FilterModel();

const siteMainElement = document.querySelector(`.page-main`);
const siteTripMainElement = document.querySelector(`.trip-main`);
const siteTripElement = document.querySelector(`.trip-events`);
const siteTripEventsElement = siteMainElement.querySelector(`.trip-events`).querySelector(`h2:nth-child(1)`);

const siteMenuElement = siteTripMainElement.querySelector(`.trip-main__trip-controls`).querySelector(`h2:nth-child(1)`);
const siteSecondMenuElement = siteTripMainElement.querySelector(`.trip-main__trip-controls`);


renderElement(siteMenuElement, new SiteMenuView().getElement(), RenderPosition.AFTEREND);
//renderElement(siteSecondMenuElement, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);
const boardPresenter = new BoardPresenter(siteTripMainElement, siteTripElement, siteTripEventsElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(siteSecondMenuElement, filterModel, pointsModel);
filterPresenter.init();
boardPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  boardPresenter.createPoint();
});
