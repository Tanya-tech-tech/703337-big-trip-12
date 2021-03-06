import Api from "./api.js";

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
  MAJOR: `MAJOR`,
  INIT: `INIT`
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

export const optionsArray = [];

export const optionForType = {};

export const DESTINATIONS = [];
export const DESCRIPTIONS = [];

const AUTHORIZATION = `Basic aS2nd3dPwcl4sa6j`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip/`;
const api = new Api(END_POINT, AUTHORIZATION);

api.getOffers()
.then((tasks) => {
  for (let i = 0; i < tasks.length; i++) {
    optionsArray.push(tasks[i]);
  }
  return tasks;
})
.then((optionArray) => {
  optionArray.map((it) => {
    Object.assign(optionForType, it);
  });

  optionArray = optionForType;
});

api.getDestinations()
  .then((array) => {
    array.map((it) => {
      DESTINATIONS.push(it.name);
    });
    return array;
  })
  .then((array) => {
    const sss = [];
    array.map((it) => {
      it = Object.values(it);
      sss.push(it);
    });
    return sss;
  })
  .then((array) => {

    array.map(([name, description, photo]) => {
      const lll = {[name]: {advantage: description, src: photo}};
      DESCRIPTIONS.push(lll);
    });
    return array;
  });
