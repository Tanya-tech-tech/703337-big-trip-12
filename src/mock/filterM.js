import {getCurrentDate} from "../utils.js";

const isPast = (dueDate) => {
  const currentDate = getCurrentDate();
  return currentDate.getTime() > dueDate.getTime();
};

const isFuture = (dueDate) => {
  const currentDate = getCurrentDate();
  return currentDate.getTime() < dueDate.getTime();
};

const filterDestination = {
  everything: (destinations) => destinations.length,
  past: (destinations) => destinations.filter((destination) => isPast(destination.dueDate)).length,
  future: (destinations) => destinations.filter((destination) => isFuture(destination.dueDate)).length
};

export const generateFilter = (destinations) => {
  return Object.entries(filterDestination).map(([filterName, countPoints]) => {
    return {
      name: filterName,
      count: countPoints(destinations),
    };
  });
};


