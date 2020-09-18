import AbstractView from "./abstract.js";

const createSortContainerTemplate = () => {
  return `<li class="trip-days__item  day">
              <div class="day__info"></div>
              <ul class="trip-events__list">
              </ul>
          </li>`;
};

export default class SortContainer extends AbstractView {
  getTemplate() {
    return createSortContainerTemplate();
  }
}
