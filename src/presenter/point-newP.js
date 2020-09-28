import DestinationEditView from "../view/destination-edit.js";
//import {generateId} from "../utils/common.js";
import {remove, renderElement, RenderPosition} from "../utils/render.js";
import {UserAction, UpdateType} from "../const.js";

export default class PointNew {
  constructor(destinationListContainer, changeData) {
    this._destinationListContainer = destinationListContainer;
    this._changeData = changeData;

    this._formEditComponent = null;
    this._destroyCallback = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(callback) {
    this._destroyCallback = callback;
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

    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }

    remove(this._formEditComponent);
    this._formEditComponent = null;
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  setSaving() {
    this._taskEditComponent.updateData({
      isDisabled: true,
      isSaving: true
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._formEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this._formEditComponent.shake(resetFormState);
  }

  _handleFormSubmit(destination) {
    this._changeData(
        UserAction.ADD_TASK,
        UpdateType.MINOR,
        destination
    );
    // this.destroy();
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
