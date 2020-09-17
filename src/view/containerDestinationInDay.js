import AbstractView from "./abstract.js";

const createDestinationListTemplate = () => {
  return `<ul class="trip-events__list"></ul>`;
};

export default class DestinationsList extends AbstractView {
  getTemplate() {
    return createDestinationListTemplate();
  }
}
