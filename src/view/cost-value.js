import AbstractView from "./abstract.js";

const сreateCostValueTemplate = () => {
  return `<p class="trip-info__cost">

    </p>`;
};

export default class CostValue extends AbstractView {
  getTemplate() {
    return сreateCostValueTemplate();
  }
}
