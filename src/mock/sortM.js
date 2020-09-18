const timeResidual = (element) => {
  const residual = element.time.endTime - element.time.startTime;
  return residual;
};

export const destinationToSort = {
  sortTime: (destinations) => {
    const rezultTime = destinations.slice();
    rezultTime.sort((a, b) => {
      return timeResidual(a) - timeResidual(b);
    });
    return rezultTime;
  },

  sortPrice: (destinations) => {
    const rezultPrice = destinations.slice();
    rezultPrice.sort((a, b) => {
      return a.price - b.price;
    });
    return rezultPrice;
  }
};


