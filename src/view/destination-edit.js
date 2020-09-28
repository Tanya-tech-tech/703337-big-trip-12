import {optionForType} from "../const.js";
import SmartView from "./smart.js";
import {DESCRIPTIONS} from "../const.js";
import {formatTaskDueDate} from "../utils/render.js";
import flatpickr from "flatpickr";
import {DESTINATIONS} from "../const.js";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";
// console.log(optionForType)

const BLANK_TASK = {
  type: ``,
  destination: ``,
  description: ``,
  dueDate: null,
  time: {
    startTime: false,
    endTime: false
  },
  price: null,
  additionalOptions: {
    typeOfOption: null,
    nameAndPriceOption: null
  },
  infomation: {
    description: ``,
    photo: null
  }
};

const createFormEditTemplate = (data) => {
  let {
    type,
    price,
    destination,
    time,
    favorite,
    information,
    description,
    additionalOptions,
    isDisabled,
    isSaving,
    isDeleting
  } = data;

  const waypoints = [
    `Taxi`,
    `Bus`,
    `Train`,
    `Ship`,
    `Transport`,
    `Drive`,
    `Flight`,

  ];

  const activity = [
    `Check-in`,
    `Sightseeing`,
    `Restaurant`
  ];

  const createIconEventEditTemplate = () => {
    if (!type) {
      return waypoints[0].toLowerCase();
    } else {
      return type.toLowerCase();
    }
  };

  const createPhotoTemplate = (arrayPhoto) => {

    return arrayPhoto.map((photo) => `<img class="event__photo"
      src="${photo.src}" alt="${photo.description}">`).join(``);
  };

  const createDescriptionTemplate = description ?
    `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${createPhotoTemplate(information.photo)}
      </div>
    </div>
  </section>`
    : ``;

  const createButtonOfferEditTemplate = () => {
    const createButtonFavoriteTemplate = favorite ?
      `checked`
      : ``;

    if (destination) {
      return `<button class="event__reset-btn" type="reset">
      ${isDeleting ? `deleting...` : `delete`}</button>
    <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${createButtonFavoriteTemplate}>
    <label class="event__favorite-btn" for="event-favorite-1">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </label>

    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>`;
    } else {
      return `<button class="event__reset-btn" type="reset">Cancel</button>`;
    }
  };

  const createEventEditTemplate = () => {
    return waypoints.map((event) => `<div
      class="event__type-item">
      <input id="event-type-${event.toLowerCase()}-1" class="event__type-input
      visually-hidden" type="radio" name="event-type" value="${event.toLowerCase()}"
      ${type === event ? `checked` : ``}>
      <label class="event__type-label
      event__type-label--${event.toLowerCase()}" for="event-type-${event.toLowerCase()}-1">${event}</label>
      </div>`).join(``);
  };

  const createEventActivityEditTemplate = () => {
    return activity.map((event) => `<div
      class="event__type-item">
      <input id="event-type-taxi-1" class="event__type-input
      visually-hidden" type="radio" name="event-type" value="${event.toLowerCase()}"
      ${type === event ? `checked` : ``}>
      <label class="event__type-label
      event__type-label--${event.toLowerCase()}" for="event-type-${event.toLowerCase()}-1">${event}</label>
      </div>`).join(``);
  };

  const createPlaceholderTemplate = () => {
    if (activity.some((it) => it === type)) {
      return `in`;
    } else {
      return `to`;
    }
  };

  const createAdditionalOptionsTemplate = () => {
    const displayOptions = (options) => {
      const finalArray = [];
      for (let i = 0; i < options.length; i++) {
        const optionsValue = Object.values(options[i]);
        finalArray.push(optionsValue);
      }
      return finalArray;
    };

    const currentOptions = displayOptions(additionalOptions);

    return currentOptions.map(([title, cost]) => `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
          <label class="event__offer-label" for="event-offer-luggage-1">
            <span class="event__offer-title">${title}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${cost}</span>
          </label>
        </div>`).join(``);
  };

  let newType = type ? type[0].toUpperCase() + type.slice(1) : ``;

  const buttonAndOffers = createButtonOfferEditTemplate();
  const iconEvent = createIconEventEditTemplate();
  const eventTemplate = createEventEditTemplate();
  const eventActivity = createEventActivityEditTemplate();

  return `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">

          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${iconEvent}.png" alt="Event type icon">
          </label>

          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1"
          type="checkbox" ${isDisabled ? `disabled` : ``}>

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>

              ${eventTemplate}

            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>

              ${eventActivity}

            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type ? newType : ``} ${createPlaceholderTemplate()}
          </label>
          <input class="event__input  event__input--destination"
          id="event-destination-1" type="text" name="event-destination"
          value="${destination}" list="destination-list-1"
          ${isDisabled ? `disabled` : ``}>
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
            <option value="Saint Petersburg"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1"
          type="text" name="event-start-time" value="${formatTaskDueDate(time.startTime)}"
          ${isDisabled ? `disabled` : ``}
          >
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1"
          type="text" name="event-end-time" value="${formatTaskDueDate(time.endTime)}"
          ${isDisabled ? `disabled` : ``}
          >
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1"
          type="text" name="event-price" value="${price ? price : ``}"
          ${isDisabled ? `disabled` : ``}
          >
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">
        ${isSaving ? `saving...` : `save`}</button>

        ${buttonAndOffers}

      </header>

      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
          ${createAdditionalOptionsTemplate()}

          </div>
        </section>
        ${createDescriptionTemplate}
      </section>

    </form>`;
};

export default class DestinationEdit extends SmartView {
  constructor(destination = BLANK_TASK) {
    super();
    this._data = DestinationEdit.parseDestinationToData(destination);
    this._datepickerStart = null;
    this._datepickerEnd = null;
    this._destination = destination;

    this._destinationInputHandler = this._destinationInputHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._destinationPriceHandler = this._destinationPriceHandler.bind(this);
    this._destinationPriceClickHandler = this._destinationPriceClickHandler.bind(this);
    this._dueDateChangeHandler = this._dueDateChangeHandler.bind(this);
    this._dueDateChangeHandlerEnd = this._dueDateChangeHandlerEnd.bind(this);
    this._typeToggleHandler = this._typeToggleHandler.bind(this);
    this._setInnerHandlers();
    this._setDatepicker();
  }

  _setDatepicker() {
    if (this._datepickerStart) {
      this._datepickerStart = null;
    }
    if (this._datepickerEnd) {
      this._datepickerEnd = null;
    }

    this._datepickerStart = flatpickr(
        this.getElement().querySelector(`#event-start-time-1`),
        {
          enableTime: true,
          dateFormat: `d/m/y H:i`,
          defaultDate: this._data.time.startTime,
          onChange: this._dueDateChangeHandler
        }
    );
    this._datepickerEnd = flatpickr(
        this.getElement().querySelector(`#event-end-time-1`),
        {
          enableTime: true,
          dateFormat: `d/m/y H:i`,
          defaultDate: this._data.time.endTime,
          onChange: this._dueDateChangeHandlerEnd
        }
    );
  }

  _dueDateChangeHandler([userDate]) {
    this.updateData({
      dueDate: userDate,
      time: {startTime: userDate, endTime: this._data.time.endTime}
    });

  }

  _dueDateChangeHandlerEnd([userDate]) {
    this.updateData({
      time: {startTime: this._data.time.startTime, endTime: userDate}
    });
  }

  removeElement() {
    super.removeElement();

    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }
  }

  reset(destination) {
    this.updateData(
        DestinationEdit.parseDestinationToData(destination)
    );
  }

  getTemplate() {
    return createFormEditTemplate(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.event__type-list`)
      .addEventListener(`click`, this._typeToggleHandler);
    this.getElement()
      .querySelector(`.event__input`)
      .addEventListener(`click`, this._destinationClickInputHandler);
    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`blur`, this._destinationInputHandler);
    this.getElement()
      .querySelector(`.event__input--price`)
      .addEventListener(`click`, this._destinationPriceClickHandler);
    this.getElement()
      .querySelector(`.event__input--price`)
      .addEventListener(`input`, this._destinationPriceHandler, true);
  }

  _typeToggleHandler(evt) {
    evt.preventDefault();
    if (evt.target.tagName === `LABEL`) {
      this.updateData({
        type: evt.target.textContent,
        additionalOptions: optionForType[evt.target.textContent.toLowerCase()]
      });
    }
  }

  _destinationClickInputHandler(evt) {
    evt.preventDefault();
    document.querySelector(`.event__input`).value = ``;
  }

  _destinationInputHandler(evt) {
    evt.preventDefault();
    const checkNameDestination = DESTINATIONS.filter((it) => it === evt.target.value);

    const dueArray = [];
    DESCRIPTIONS.slice().forEach((it) => {
      const key = Object.keys(it).find((element) => element === evt.target.value);
      if (key !== undefined) {
        dueArray.push(it);
      }
    });

    // console.log(dueArray[0][evt.target.value].src)

    if (checkNameDestination.length === 0) {
      evt.target.value = `Введите пункт назначения из предложенных`;
    }
    this.updateData({
      destination: evt.target.value
    }, false);
    this.updateData({
      description: dueArray[0][evt.target.value].advantage
    }, false);
    this.updateData({
      information: {photo: dueArray[0][evt.target.value].src}
    }, false);
  }

  _destinationPriceClickHandler(evt) {
    evt.preventDefault();
    document.querySelector(`.event__input--price`).value = ``;
  }

  _destinationPriceHandler(evt) {
    // evt.preventDefault();
    if (event.keyCode === 46 || event.keyCode === 8 || event.keyCode === 9 || event.keyCode === 27 ||
    // Разрешаем: Ctrl+A
    (event.keyCode === 65 && event.ctrlKey === true) ||
    // Разрешаем: home, end, влево, вправо
    (event.keyCode >= 35 && event.keyCode <= 39)) {
      return;
    } else {
    // Запрещаем все, кроме цифр на основной клавиатуре, а так же Num-клавиатуре
      if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
        event.preventDefault();
      }
    }

    this.updateData({
      price: Number(evt.target.value)
    }, false);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(DestinationEdit.parseDataToDestination(this._data));
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener(`submit`, this._formSubmitHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteClickHandler);
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(DestinationEdit.parseDataToDestination(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._formDeleteClickHandler);
  }

  static parseDestinationToData(destination) {
    return Object.assign(
        {},
        destination,
        {
          isFavorite: destination.favorite !== null,
          isDisabled: false,
          isSaving: false,
          isDeleting: false
        }
    );
  }

  static parseDataToDestination(data) {
    data = Object.assign({}, data);

    if (!data.isFavorite) {
      data.favorite = null;
    }

    delete data.isFavorite;
    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;

    return data;
  }
}
