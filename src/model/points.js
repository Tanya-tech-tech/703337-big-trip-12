import Observer from "../utils/observer.js";

export default class Points extends Observer {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(updateType, points) {
    this._points = points.slice();
    this._notify(updateType);
  }

  getPoints() {
    return this._points;
  }

  updatePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting task`);
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType, update); // выполняются все функции observers
  }

  addPoint(updateType, update) {
    this._points = [
      update,
      ...this._points
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting task`);
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType);
  }

  static adaptToClient(point) {
    const adaptedTask = Object.assign(
        {},
        point,
        {
          dueDate: point.date_from !== null ? new Date(point.date_from) : point.date_from, // На клиенте дата хранится как экземпляр Date
          time: {
            startTime: new Date(point.date_from),
            endTime: new Date(point.date_to)
          },
          favorite: point.is_favorite,
          price: point.base_price,
          additionalOptions: point.offers,
          description: point.destination.description,
          information: {
            photo: point.destination.pictures
          },
          destination: point.destination.name // пунк назначения
        }
    );

    // Ненужные ключи мы удаляем
    delete adaptedTask.base_price;
    delete adaptedTask.is_favorite;
    delete adaptedTask.date_from;
    delete adaptedTask.date_to;

    return adaptedTask;
  }

  static adaptToServer(point) {
    const adaptedTask = Object.assign(
        {},
        point,
        {
          "date_from": point.dueDate instanceof Date ? point.dueDate.toISOString() : null, // На сервере дата хранится в ISO формате
          "date_to": point.time.endTime instanceof Date ? point.time.endTime.toISOString() : null,
          "base_price": point.price,
          "type": point.type.toLowerCase(),
          "is_favorite": point.favorite,
          "destination": {
            "description": point.description,
            "name": point.destination,
            "pictures": point.information.photo
          },
          "offers": point.additionalOptions
        }
    );

    // Ненужные ключи мы удаляем
    delete adaptedTask.dueDate;
    delete adaptedTask.favorite;
    delete adaptedTask.description;

    return adaptedTask;
  }
}
