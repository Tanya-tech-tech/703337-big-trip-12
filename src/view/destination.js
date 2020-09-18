import AbstractView from "./abstract.js";
import {formatTaskDueDate} from "../utils/render.js";
import moment from "moment";

const displayOptions = (options) => {
  const count = 3;
  let finalArray = [];
  let displayArray = [];
  if (options === ``) {
    displayArray = options;
    finalArray = options;
  } else if (options.length > count) {
    for (let i = 0; i < count; i++) {
      displayArray.push(options[i]);
    }
    for (let j = 0; j < displayArray.length; j++) {
      const optionsValue = Object.values(displayArray[j]);
      finalArray.push(optionsValue);
    }
  } else {
    displayArray = options;
    for (let j = 0; j < displayArray.length; j++) {
      const optionsValue = Object.values(displayArray[j]);
      finalArray.push(optionsValue);
    }
  }

  return finalArray;
};

const timeResidual = (timeStart, timeEnd) => {
  const a = moment(timeStart);
  const b = moment(timeEnd);

  if (!b.diff(a, `hours`)) {
    return `${b.diff(a, `minutes`)}M`;
  }
  if (!b.diff(a, `days`)) {
    return `${b.diff(a, `hours`)}H ${Math.floor((b.diff(a, `milisecunds`) / (1000 * 60)) % 60)}M`;
  }
  return `${b.diff(a, `days`)}D ${Math.floor((b.diff(a, `milisecunds`) / (1000 * 60 * 60)) % 24) ? `${Math.floor((b.diff(a, `milisecunds`) / (1000 * 60 * 60)) % 24)}H` : ``} ${Math.floor((b.diff(a, `milisecunds`) / (1000 * 60)) % 60)}M`;

};

const createDestinationTemplate = (destinationPoint) => {
  const {type, destination, time, price, additionalOptions} = destinationPoint;

  const createPlaceholderTemplate = () => {
    const activity = [
      `Check-in`,
      `Sightseeing`,
      `Restaurant`
    ];

    if (activity.some((it) => it === type)) {
      return `in`;
    } else {
      return `to`;
    }
  };

  const symbolEuro = additionalOptions
    ? `&plus;
    &euro;&nbsp;`
    : ``;

  const createOptionTemplate = () => {
    const currentOptions = displayOptions(additionalOptions);

    return currentOptions ? currentOptions.map(([name, cost]) => `<li class="event__offer">
    <span class="event__offer-title">${name}</span>
    ${symbolEuro} <span class="event__offer-price">${cost}</span>
    </li>`).join(``)
      : ``;
  };

  return `<li class="trip-events__item">
        <div class="event">
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${type ? type.toLowerCase() : `taxi`}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${type} ${createPlaceholderTemplate()} ${destination}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${formatTaskDueDate(time.startTime)}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${formatTaskDueDate(time.endTime)}</time>
          </p>
          <p class="event__duration">${timeResidual(time.startTime, time.endTime)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price ? price : ``}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${createOptionTemplate()}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`;
};

export default class Destination extends AbstractView {
  constructor(destination) {
    super();
    this._destination = destination;
    this._editClickHandler = this._editClickHandler.bind(this);
  }

  getTemplate() {
    return createDestinationTemplate(this._destination);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
  }
}
