import DestinationView from "../view/destination.js";
import DestinationEditView from "../view/destination-edit.js";
import {renderElement, RenderPosition, replace, remove} from "../utils/render.js";
import {UserAction, UpdateType} from "../const.js";
import {isDatesEqual} from "../utils/common.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class Destination {
  constructor(destinationListContainer, changeData, changeMode) {
    this._destinationListContainer = destinationListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._destinationComponent = null;
    this._formEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(destination) {
    this._destination = destination;

    const prevDestinationComponent = this._destinationComponent;
    const prevFormEditComponent = this._formEditComponent;

    this._destinationComponent = new DestinationView(destination);
    this._formEditComponent = new DestinationEditView(destination);

    this._destinationComponent.setEditClickHandler(this._handleEditClick);
    this._formEditComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._formEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._formEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    if (prevDestinationComponent === null || prevFormEditComponent === null) {
      renderElement(this._destinationListContainer, this._destinationComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._destinationComponent, prevDestinationComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._formEditComponent, prevFormEditComponent);
    }

    remove(prevDestinationComponent);
    remove(prevFormEditComponent);
  }

  // _handleFormSubmit(destination) {
  _handleFormSubmit(update) {
  // Проверяем, поменялись ли в задаче данные, которые попадают под фильтрацию,
  // а значит требуют перерисовки списка - если таких нет, это PATCH-обновление
    // this._changeData(destination);
    if (update.destination === `Введите пункт назначения из предложенных`) {
      return;
    }
    const isMinorUpdate = !isDatesEqual(this._destination.dueDate, update.dueDate);// true or false
    this._changeData(
        UserAction.UPDATE_TASK,
        isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
        update
    );

    this._replaceFormToDestination();
  }

  _handleDeleteClick(destination) {
    this._changeData(
        UserAction.DELETE_TASK,
        UpdateType.MINOR,
        destination
    );
    // this._replaceFormToDestination();
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToDestination();
    }
  }

  _handleFavoriteClick() {
    this._changeData(
        UserAction.UPDATE_TASK,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._destination,
            {
              favorite: !this._destination.favorite
            }
        )
    );
  }

  destroy() {
    remove(this._destinationComponent);
    remove(this._formEditComponent);
  }

  _replaceDestinationToForm() {
    replace(this._formEditComponent, this._destinationComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToDestination() {
    replace(this._destinationComponent, this._formEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    evt.preventDefault();
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this._formEditComponent.reset(this._destination);
      this._replaceFormToDestination();
    }
  }

  _handleEditClick() {
    this._replaceDestinationToForm();
  }
}

