import {FilterType} from "../const";
import {getCurrentDate} from "../utils/common.js";
import moment from "moment";

const isPast = (dueDate) => {
  const currentDate = getCurrentDate();
  // return currentDate.getTime() > dueDate.getTime();
  return moment(currentDate).isAfter(dueDate);
};

const isFuture = (dueDate) => {
  const currentDate = getCurrentDate();
  // return currentDate.getTime() < dueDate.getTime();
  return moment(currentDate).isBefore(dueDate, `day`);
};

export const filterPoint = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((it) => isFuture(it.dueDate)),
  [FilterType.PAST]: (points) => points.filter((point) => isPast(point.dueDate)),
};
