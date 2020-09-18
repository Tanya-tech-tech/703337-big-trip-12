import Observer from "../utils/observer.js";

export default class Options extends Observer {
  constructor() {
    super();
    this._options = [];
  }

  setPoints(options) {
    this._options = options.slice();
  }

  getPoints() {
    return this._options;
  }
}
