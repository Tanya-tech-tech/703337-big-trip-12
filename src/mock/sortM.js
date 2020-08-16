const timeResidual = (element) => {
  const residual = element.time.endTime - element.time.startTime;
  return residual;
};

export const destinationToSort = {
  sortTime: (destinations) => {
    const rezultPrice = destinations;
    rezultPrice.sort((a, b) => {
      return timeResidual(a) - timeResidual(b);
    });
    return rezultPrice;
  },

  sortPrice: (destinations) => {
    const rezultPrice = destinations;
    rezultPrice.sort((a, b) => {
      return a.price - b.price;
    });
    return rezultPrice;
  }
};


