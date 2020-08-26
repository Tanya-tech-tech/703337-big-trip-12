import AbstractView from "./abstract.js";

const сreateRouteListTemplate = () => {
  return `<section class="trip-main__trip-info  trip-info"></section>`;
};

export default class RouteList extends AbstractView {

  getTemplate() {
    return сreateRouteListTemplate();
  }
}
