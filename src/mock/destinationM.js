import {WAYPOINTS} from "../const.js";
import {DESTINATIONS} from "../const.js";
import {DESCRIPTIONS} from "../const.js";
import {NAMES} from "../const.js";
import {getRandomInteger} from "../utils.js";

const generateWaypoint = () => {
  return WAYPOINTS[getRandomInteger(0, WAYPOINTS.length - 1)];
};

const generatePointDestination = () => {
  return DESTINATIONS[getRandomInteger(1, DESTINATIONS.length - 1)];
};

const generateDescription = () => {
  const fullDescription = [];
  const quantityDescription = getRandomInteger(1, 5);
  for (let i = 0; i < quantityDescription; i++) {
    fullDescription.push(DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)]);
  }
  return fullDescription;
};

const generateOptionPrice = () => {
  const optionPrices = [20, 30, 40, 100, 150, 200, 300, 400, 1000];
  return optionPrices[getRandomInteger(0, optionPrices.length - 1)];
};

const getRandomOption = () => {
  const getRandomOptionName = () => {
    const identifier = NAMES[getRandomInteger(0, NAMES.length - 1)];
    return identifier;
  };

  return {
    name: getRandomOptionName(),
    cost: generateOptionPrice()
  };
};

const generateOptionName = () => {
  const quantityNames = getRandomInteger(0, 5);
  let arrayNames = [];

  if (quantityNames !== 0) {
    for (let i = 0; i < quantityNames; i++) {
      arrayNames.push(getRandomOption());
    }
  } else {
    arrayNames = ``;
  }
  return arrayNames;
};

const generateDate = () => {
  const daysGap = getRandomInteger(18, 20);
  const currentDate = new Date();

  currentDate.setFullYear(2019, 2);

  currentDate.setDate(daysGap);
  currentDate.setHours(23, 59, 59, 999);
  return new Date(currentDate);
};

const generateStartTime = (date) => {
  const hoursValue = new Date(date);
  hoursValue.setHours(getRandomInteger(0, 18), getRandomInteger(0, 59));

  return hoursValue;
};

const generateEndTime = (date) => {
  const hoursValue = new Date(date);
  hoursValue.setHours(date.getHours() + getRandomInteger(0, 5), date.getMinutes() + getRandomInteger(0, 59));

  return hoursValue;
};

export const generateDestination = () => {

  const type = generateWaypoint();
  const dueDate = generateDate();
  const startTime = generateStartTime(dueDate);
  const endTime = generateEndTime(startTime);
  const price = getRandomInteger(5, 2000);

  const typeOfOption = type;

  return {
    type,
    destination: generatePointDestination(),
    dueDate,
    time: {
      startTime,
      endTime
    },
    price,
    additionalOptions: {
      typeOfOption,
      nameAndPriceOption: generateOptionName(),
    },
    infomation: {
      description: generateDescription(),
      photo: `http://picsum.photos/248/152?r=${Math.random()}`
    }
  };
};

