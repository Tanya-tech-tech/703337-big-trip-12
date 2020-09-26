import moment from "moment";

export const makeItemsUniq = (items) => [...new Set(items)];

export const countPointsByMoney = (points, arrayCompare) => {
  const arrayPrice = [];
  arrayCompare.map((it) => {
    let price = 0;
    points.forEach((point) => {
      if (it === point.type) {
        price = price + Number(point.price);
      }
    });
    arrayPrice.push(price);
  });
  return arrayPrice;
};

export const arrayPointsByTransport = (points, arrayCompare) => {
  const arrayTransport = points.slice();
  arrayCompare.forEach((it) => {
    let index = arrayTransport.indexOf(`${it}`);
    if (index > -1) {
      arrayTransport.splice(index, 1);
    }
  });
  return arrayTransport;
};

export const countPointsByTransport = (points, arrayCompare) => {
  let finalArray = [];
  arrayCompare.map((it) => {
    const repeat = [];
    points.forEach((point) => {
      if (point === it) {
        repeat.push(point);
      }
    });
    const element = repeat.length;
    finalArray.push(element);
  });
  return finalArray;
};

export const timeResidual = (timeStart, timeEnd) => {
  const a = moment(timeStart);
  const b = moment(timeEnd);
  return b.diff(a, `hours`);
};

export const countPointsByTime = (points, arrayCompare) => {
  const finalArray = [];
  arrayCompare.map((it) => {
    let counter = 0;
    points.map((point) => {
      if (it === point.type) {
        counter = counter + timeResidual(point.time.startTime, point.time.endTime);
      }
    });
    finalArray.push(counter);
  });
  return finalArray;
};

