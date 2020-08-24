import AbstractView from "./abstract.js";

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

const creatDateNeedfulView = (date) => {
  let day = date.getDate();
  let numberMonth = date.getMonth() + 1;
  let month = numberMonth < 10 ? `0` + numberMonth : numberMonth;
  let year = `${date.getFullYear()}`.slice(-2);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

const createFormEditTemplate = (destinationPoint) => {
  const {type, price, destination, time} = destinationPoint;

  const createIconEventEditTemplate = () => {
    return type.toLowerCase();
  };

  const createButtonOfferEditTemplate = () => {
    if (destination) {
      return `<button class="event__reset-btn" type="reset">Delete</button>
    <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked>
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
    const waypoints = [
      `Taxi`,
      `Bus`,
      `Train`,
      `Ship`,
      `Transport`,
      `Drive`,
      `Flight`,

    ];

    return waypoints.map((event) => `<div
      class="event__type-item">
      <input id="event-type-taxi-1" class="event__type-input
      visually-hidden" type="radio" name="event-type" value="${event.toLowerCase()}"
      ${type === event ? `checked` : ``}>
      <label class="event__type-label
      event__type-label--${event.toLowerCase()}" for="event-type-${event.toLowerCase()}-1">${event.toLowerCase()}</label>
      </div>`).join(``);
  };

  const createEventActivityEditTemplate = () => {
    const activity = [
      `Check-in`,
      `Sightseeing`,
      `Restaurant`
    ];
    return activity.map((event) => `<div
      class="event__type-item">
      <input id="event-type-taxi-1" class="event__type-input
      visually-hidden" type="radio" name="event-type" value="${event.toLowerCase()}"
      ${type === event ? `checked` : ``}>
      <label class="event__type-label
      event__type-label--${event.toLowerCase()}" for="event-type-${event.toLowerCase()}-1">${event.toLowerCase()}</label>
      </div>`).join(``);
  };

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

          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

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
            ${type} to
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
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
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${creatDateNeedfulView(time.startTime)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${creatDateNeedfulView(time.endTime)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>

        ${buttonAndOffers}

      </header>

      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
              <label class="event__offer-label" for="event-offer-luggage-1">
                <span class="event__offer-title">Add luggage</span>
                &plus;
                &euro;&nbsp;<span class="event__offer-price">30</span>
              </label>
            </div>

            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked>
              <label class="event__offer-label" for="event-offer-comfort-1">
                <span class="event__offer-title">Switch to comfort class</span>
                &plus;
                &euro;&nbsp;<span class="event__offer-price">100</span>
              </label>
            </div>

            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal">
              <label class="event__offer-label" for="event-offer-meal-1">
                <span class="event__offer-title">Add meal</span>
                &plus;
                &euro;&nbsp;<span class="event__offer-price">15</span>
              </label>
            </div>

            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats">
              <label class="event__offer-label" for="event-offer-seats-1">
                <span class="event__offer-title">Choose seats</span>
                &plus;
                &euro;&nbsp;<span class="event__offer-price">5</span>
              </label>
            </div>

            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train">
              <label class="event__offer-label" for="event-offer-train-1">
                <span class="event__offer-title">Travel by train</span>
                &plus;
                &euro;&nbsp;<span class="event__offer-price">40</span>
              </label>
            </div>
          </div>
        </section>
      </section>

    </form>`;
};

export default class DestinationEdit extends AbstractView {
  constructor(destination) {
    super();
    this._destination = destination || BLANK_TASK;
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  getTemplate() {
    return createFormEditTemplate(this._destination);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener(`submit`, this._formSubmitHandler);
  }
}
