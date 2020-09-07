import DestinationView from "../view/destination.js";
import DestinationEditView from "../view/destination-edit.js";
import {renderElement, RenderPosition, replace, remove} from "../utils/render.js";

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

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToDestination();
    }
  }

  _handleFavoriteClick() {
    this._changeData(
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

  _handleFormSubmit(destination) {
    this._changeData(destination);
    this._replaceFormToDestination();
  }
}

