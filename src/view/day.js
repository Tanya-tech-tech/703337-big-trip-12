import AbstractView from "./abstract.js";
import moment from "moment";

export let quantityDays = [];

const createDayTemplate = (pointsModel) => {
  const allDatesTrip = [];
  let dateDestinations = pointsModel.slice();

  dateDestinations.sort((a, b) => a.dueDate - b.dueDate);


  let index = 0;


  const createDateArray = () => {
    if (dateDestinations === null) {
      return;
    }
    index = dateDestinations.findIndex((item) =>
      !moment(item.dueDate).isSame(dateDestinations[0].dueDate, `day`));

    if (index === -1) {
      allDatesTrip.push(dateDestinations);
      dateDestinations = null;
    } else {
      allDatesTrip.push([...dateDestinations.slice(0, index)]);
      dateDestinations.splice(0, index);
    }
  };

  for (let i = 0; i < pointsModel.length; i++) {
    createDateArray();
  }

  quantityDays = allDatesTrip.slice();

  let count = 1;
  const daysArray = [];

  for (let i = 0; i < allDatesTrip.length; i++) {
    const date = () => {
      let dateDay = new Date(allDatesTrip[i][0].dueDate);
      dateDay.setHours(23, 59, 59, 999);
      return new Date(dateDay).toLocaleDateString(`en-GB`, {month: `long`, day: `numeric`}).slice(0, 6);
    };

    let oneDay = `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${count}</span>
          <time class="day__date" datetime="${date()}">${date()}</time>
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
  constructor(pointsModel) {
    super();
    this._pointsModel = pointsModel;
  }

  getTemplate() {
    return createDayTemplate(this._pointsModel);
  }
}

