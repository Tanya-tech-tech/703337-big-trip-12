import {createElement} from "../utils.js";

const сreateRouteListTemplate = () => {
  return `<section class="trip-main__trip-info  trip-info"></section>`;
};

export default class RouteList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return сreateRouteListTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
