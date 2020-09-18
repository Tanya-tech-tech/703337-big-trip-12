import DestinationEditView from "../view/destination-edit.js";
import {generateId} from "../mock/destinationM.js";
import {remove, renderElement, RenderPosition} from "../utils/render.js";
import {UserAction, UpdateType} from "../const.js";

export default class PointNew {
  constructor(destinationListContainer, changeData) {
    this._destinationListContainer = destinationListContainer;
    this._changeData = changeData;

    this._formEditComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init() {
    if (this._formEditComponent !== null) { // открыта только одна форма добавления нового путешествия
      return;
    }
    this._formEditComponent = new DestinationEditView();
    this._formEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._formEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    renderElement(this._destinationListContainer, this._formEditComponent, RenderPosition.BEFOREBEGIN);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._formEditComponent === null) {
      return;
    }
    remove(this._formEditComponent);
    this._formEditComponent = null;
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleFormSubmit(destination) {
    this._changeData(
        UserAction.ADD_TASK,
        UpdateType.MINOR,
        // Пока у нас нет сервера, который бы после сохранения
        // выдывал честный id задачи, нам нужно позаботиться об этом самим
        Object.assign({id: generateId()}, destination)
    );
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
