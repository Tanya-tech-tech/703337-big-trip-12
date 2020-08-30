import AbstractView from "./abstract.js";

const createDayTemplate = (dayItems) => {

  let count = 1;
  const daysArray = [];

  for (let i = 0; i < dayItems.length; i++) {
    const date = () => {
      let dateDay = new Date(dayItems[i]);
      dateDay.setHours(23, 59, 59, 999);
      return new Date(dateDay).toLocaleDateString(`en-GB`, {month: `long`, day: `numeric`}).slice(-8, -2);
    };

    let oneDay = `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${count}</span>
          <time class="day__date" datetime="${dayItems[i]}">${date()}</time>
        </div>

        <ul class="trip-events__list"></ul>
      </li>`;
    daysArray.push(oneDay);
    count += 1;
  }

  const dayItemsTemplate = daysArray.join(``);
  return `<div>${dayItemsTemplate}</div>`;
};

export default class Days extends AbstractView {
  constructor(days) {
    super();
    this._days = days;
  }

  getTemplate() {
    return createDayTemplate(this._days);
  }
}

