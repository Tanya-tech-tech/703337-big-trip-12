import SiteMenuView from "./view/site-menu.js";
import StatisticsView from "./view/statistics.js";
import Api from "./api.js";
import BoardPresenter from "./presenter/board.js";
import FilterPresenter from "./presenter/filterP.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filterModel.js";
// import {generateDestination} from "./mock/destinationM.js";
import {renderElement, RenderPosition, remove} from "./utils/render.js";
import {MenuItem, UpdateType, FilterType} from "./const.js";

// const TASK_COUNT = 4;
const AUTHORIZATION = `Basic aS2nd3dPwcl4sa6j`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip/`;

const siteMainElement = document.querySelector(`.page-main`);
const siteTripMainElement = document.querySelector(`.trip-main`);
const siteTripElement = document.querySelector(`.trip-events`);
const siteTripEventsElement = siteMainElement.querySelector(`.trip-events`).querySelector(`h2:nth-child(1)`);

const siteMenuElement = siteTripMainElement.querySelector(`.trip-main__trip-controls`).querySelector(`h2:nth-child(1)`);
const siteSecondMenuElement = siteTripMainElement.querySelector(`.trip-main__trip-controls`);

const api = new Api(END_POINT, AUTHORIZATION);
const pointsModel = new PointsModel();
// pointsModel.setPoints(destinations);

const filterModel = new FilterModel();

const siteMenuComponent = new SiteMenuView();


const boardPresenter = new BoardPresenter(siteTripMainElement, siteTripElement, siteTripEventsElement, pointsModel, filterModel, api);
const filterPresenter = new FilterPresenter(siteSecondMenuElement, filterModel, pointsModel);

const handleTaskNewFormClose = () => {
  siteMenuComponent.getElement().querySelector(`[id=${MenuItem.TABLE}]`).classList.add(`trip-tabs__btn--active`);
  siteMenuComponent.setMenuItem(MenuItem.TABLE);
};
let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_EVENT:
      // Скрыть статистику
      remove(statisticsComponent);
      // Показать доску
      boardPresenter.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
      boardPresenter.init();
      // Показать форму добавления новой задачи
      boardPresenter.createTask(handleTaskNewFormClose);
      // Убрать выделение с ADD NEW TASK после сохранения
      siteMenuComponent.getElement().querySelector(`[id=${MenuItem.TABLE}]`).disabled = true;
      break;
    case MenuItem.TABLE:
      // Показать доску
      document.querySelector(`#${MenuItem.STATS}`).classList.remove(`trip-tabs__btn--active`);
      boardPresenter.init();
      // Скрыть статистику
      remove(statisticsComponent);
      break;
    case MenuItem.STATS:
      // Скрыть доску
      document.querySelector(`#${MenuItem.TABLE}`).classList.remove(`trip-tabs__btn--active`);
      boardPresenter.destroy();
      // Показать статистику
      statisticsComponent = new StatisticsView(pointsModel.getPoints());
      renderElement(siteTripElement, statisticsComponent, RenderPosition.AFTEREND);
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
renderElement(siteMenuElement, siteMenuComponent, RenderPosition.AFTEREND);

filterPresenter.init();
boardPresenter.init();

api.getTasks()
  .then((tasks) => {

    pointsModel.setPoints(UpdateType.INIT, tasks);
    renderElement(siteMenuElement, siteMenuComponent, RenderPosition.AFTEREND);
    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
    renderElement(siteMenuElement, siteMenuComponent, RenderPosition.AFTEREND);
    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  });

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  if (statisticsComponent !== null) {
    remove(statisticsComponent);
    boardPresenter.init();
  }

  boardPresenter.createPoint(handleTaskNewFormClose);
});
