import AbstractView from "./abstract.js";

const сreateSiteRouteTemplate = () => {
  return `<div class="trip-info__main">



      </div>`;
};

export default class Route extends AbstractView {
  getTemplate() {
    return сreateSiteRouteTemplate();
  }
}
