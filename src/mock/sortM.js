const timeResidual = (element) => {
  const residual = element.time.endTime - element.time.startTime;
  return residual;
};

export const destinationToSort = {
  sortTime: (destinations) => {
    const rezultPrice = destinations;
    rezultPrice.sort((a, b) => {
      let rankDiff = timeResidual(a) - timeResidual(b);
      return rankDiff;
    });
    return rezultPrice;
  },

  sortPrice: (destinations) => {
    const rezultPrice = destinations;
    rezultPrice.sort((a, b) => {
      if (a.price > b.price) {
        return 1;
      }
      if (a.price < b.price) {
        return -1;
      }
      return 0;
    });
    return rezultPrice;
  }
};


