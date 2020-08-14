const isNameOptions = (nameOption) => {
  return Object.values(nameOption).some((it) => {
    return it === ``;
  });
};

const displayOptions = (options) => {
  const count = 3;
  const finalArray = [];
  let displayArray = [];
  if (options.length > count) {
    for (let i = 0; i < count; i++) {
      displayArray.push(options[i]);
    }
  } else {
    displayArray = options;
  }

  for (let j = 0; j < displayArray.length; j++) {
    const optionsValue = Object.values(displayArray[j]);
    finalArray.push(optionsValue);
  }
  return finalArray;
};

const timeResidual = (timeStart, timeEnd) => {
  const residual = (timeEnd - timeStart);

  let minutes = Math.floor((residual / (1000 * 60)) % 60);
  let hours = Math.floor((residual / (1000 * 60 * 60)) % 24);
  let days = Math.floor((residual / (1000 * 60 * 60 * 24)));
  hours = (hours < 10) ? `0` + hours : hours;
  minutes = (minutes < 10) ? `0` + minutes : minutes;

  if (!days && minutes && !hours) {
    return `${minutes}M`;
  } else if (!days && hours && minutes) {
    return `${hours}H ${minutes}M`;
  }
  return `${days}D ${hours}H ${minutes}M`;
};

export const createDestinationTemplate = (destinationPoint) => {
  const {type, destination, time, price, additionalOptions} = destinationPoint;

  const symbolEuro = isNameOptions(additionalOptions.nameAndPriceOption) ? ``
    : `&plus;
    &euro;&nbsp;`;

  const createOptionTemplate = () => {
    const currentOptions = displayOptions(additionalOptions.nameAndPriceOption);

    return currentOptions.map(([name, cost]) => `<li class="event__offer">
    <span class="event__offer-title">${name}</span>
    ${symbolEuro} <span class="event__offer-price">${cost}</span>
    </li>`).join(``);
  };

  return `<li class="trip-events__item">
        <div class="event">
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${type} to ${destination}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${time.startTime.toLocaleTimeString(`en-GB`, {hour12: false}).slice(0, -3)}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${time.endTime.toLocaleTimeString(`en-GB`, {hour12: false}).slice(0, -3)}</time>
          </p>
          <p class="event__duration">${timeResidual(time.startTime, time.endTime)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
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
