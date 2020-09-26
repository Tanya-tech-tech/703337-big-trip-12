export const Waypoints = {
  TAXI: `Taxi`,
  BUS: `Bus`,
  TRAIN: `Train`,
  SHIP: `Ship`,
  TRANSPORT: `Transport`,
  DRIVE: `Drive`,
  FLIGHT: `Flight`,
  CHECKIN: `Check-in`,
  SIGHTSEEING: `Sightseeing`,
  RESTAURANT: `Restaurant`
};

export const WAYPOINTS = Object.values(Waypoints);

export const DESTINATIONS = [
  `Moscow`,
  `Krasnodar`,
  `Batumy`,
  `Sochi`,
  `Kolomna`
];
export const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];
export const NAMES = [
  `Order Uber`,
  `Add breakfast`,
  `Book tickets`,
  `Lunch in city`,
  `Rent a car`,
  `Add luggage`,
  `Switch to comfort class`,
  `Add meal`,
  `Choose seats`,
  `Travel by train`
];

export const optionForType = {
  Taxi: [{name: `Lunch in city`, cost: 50}, {name: `Order Uber`, cost: 35}, {name: `Book tickets`, cost: 20}],
  Bus: [{name: `Choose seats`, cost: 15}],
  Train: [{name: `Travel by train`, cost: 100}, {name: `Add meal`, cost: 70}],
  Ship: ``,
  Transport: [{name: `Switch to comfort class`, cost: 40}],
  Drive: [{name: `Rent a car`, cost: 300}],
  Flight: [{name: `Add meal`, cost: 70}],
  CheckIn: [{name: `Add breakfast`, cost: 120}],
  Sightseeing: [{name: `Book tickets`, cost: 20}],
  Restaurant: ``
};

export const SortType = {
  DEFAULT: `event`,
  PRICE: `price`,
  TIME: `time`
};

export const UserAction = {
  UPDATE_TASK: `UPDATE_TASK`,
  ADD_TASK: `ADD_TASK`,
  DELETE_TASK: `DELETE_TASK`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export const MenuItem = {
  ADD_NEW_EVENT: `ADD_NEW_EVENT`,
  TABLE: `TABLE`,
  STATS: `STATS`
};
