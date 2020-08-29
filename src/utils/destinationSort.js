const timeResidual = (element) => {
  const residual = element.time.endTime - element.time.startTime;
  return residual;
};

const getWeightForNull = (elementA, elementB) => {
  if (elementA === null && elementB === null) {
    return 0;
  }
  if (elementA === null) {
    return 1;
  }
  if (elementB === null) {
    return -1;
  }
  return null;
};

export const sortTime = (a, b) => {
  const weight = getWeightForNull(timeResidual(a), timeResidual(b));
  if (weight !== null) {
    return weight;
  }
  return timeResidual(b) - timeResidual(a);
};

export const sortPrice = (a, b) => {
  const weight = getWeightForNull(a.price, b.price);
  if (weight !== null) {
    return weight;
  }
  return b.price - a.price;
};
