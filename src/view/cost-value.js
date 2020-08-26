import AbstractView from "./abstract.js";

const сreateCostValueTemplate = () => {
  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">0</span>
    </p>`;
};

export default class CostValue extends AbstractView {
  getTemplate() {
    return сreateCostValueTemplate();
  }
}
