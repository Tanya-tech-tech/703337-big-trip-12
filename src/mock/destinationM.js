import {WAYPOINTS} from "../const.js";
import {DESTINATIONS} from "../const.js";
import {DESCRIPTIONS} from "../const.js";
import {getRandomInteger} from "../utils/common.js";
import {optionForType} from "../const.js";

export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

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

const generateAppropriateArray = (appropriateType) => {
  let arrayOptions;
  const keys = Object.keys(optionForType);
  for (const key of keys) {
    if (appropriateType === key) {
      arrayOptions = optionForType[key];
    } else if (appropriateType === `Check-in`) {
      arrayOptions = optionForType.CheckIn;
    }
  }
  return arrayOptions;
};

const generateAppropriateOption = (appropriateArray) => {

  let arrayNames = [];
  if (appropriateArray === ``) {
    arrayNames = appropriateArray;
  }

  for (let i = 0; i < appropriateArray.length; i++) {
    arrayNames.push(appropriateArray[i]);
  }

  return arrayNames;
};

export const generateDestination = () => {

  const type = generateWaypoint();
  const dueDate = generateDate();
  const startTime = generateStartTime(dueDate);
  const endTime = generateEndTime(startTime);
  const price = getRandomInteger(5, 2000);

  return {
    id: generateId(),
    type,
    destination: generatePointDestination(),
    dueDate,
    time: {
      startTime,
      endTime
    },
    price,
    favorite: Boolean(getRandomInteger(0, 1)),
    additionalOptions: generateAppropriateOption(generateAppropriateArray(type)),
    description: generateDescription(),
    infomation: {
      description: generateDescription(),
      photo: `http://picsum.photos/248/152?r=${Math.random()}`
    }
  };
};

