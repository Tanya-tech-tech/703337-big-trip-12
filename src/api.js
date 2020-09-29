import PointsModel from "./model/points.js";

const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getTasks() {
    return this._load({url: `points`})
      .then(Api.toJSON)
      .then((points) => points.map(PointsModel.adaptToClient))
      .catch((err) => console.error('Ошибка:', error));
  }

  getOffers() {
    return this._load({url: `offers`})
    .then(Api.toJSON)
    .then((tasks) => {
      for (let i = 0; i < tasks.length; i++) {
        tasks[i] = Object.values(tasks[i]);
      }
      return tasks;
    })
    .then((tasks) => {
      const arrayOption = [];
      for (let i = 0; i < tasks.length; i++) {
        const copy = tasks[i];
        const name = copy[0];
        const value = copy[1];
        const dueObject = {[name]: value};
        arrayOption.push(dueObject);
      }
      return arrayOption;
    });
  }

  getDestinations() {
    return this._load({url: `destinations`})
    .then(Api.toJSON);
  }

  updateTask(task) {
    return this._load({
      url: `points/${task.id}`,
      method: Method.PUT,
      body: JSON.stringify(PointsModel.adaptToServer(task)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON)
      // .then((points) => {console.log(points)})
      .then(PointsModel.adaptToClient);
  }

  addTask(task) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(PointsModel.adaptToServer(task)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON)
      // .then((points) => {console.log(points)})
      .then(PointsModel.adaptToClient);
  }

  deleteTask(task) {
    return this._load({
      url: `points/${task.id}`,
      method: Method.DELETE
    });
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers()
  }) {
    headers.append(`Authorization`, this._authorization);

    return fetch(
        `${this._endPoint}/${url}`,
        {method, body, headers}
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN &&
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
