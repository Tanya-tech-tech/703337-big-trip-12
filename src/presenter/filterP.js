import FilterView from "../view/filter.js";
import {renderElement, RenderPosition, replace, remove} from "../utils/render.js";
import {filterPoint} from "../utils/filterU.js";
import {FilterType, UpdateType} from "../const.js";

export default class Filter {
  constructor(filterContainer, filterModel, pointsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;// new FilterModel();
    this._pointsModel = pointsModel; // pointsModel.setPoints(destinations); массив объектов
    this._currentFilter = null;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter(); // активный фильтр

    const filters = this._getFilters(); // массив с типами фильтров
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._currentFilter);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      renderElement(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }
    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType); // устанавливает активный фильтр и выполнение функции
  }

  _handleModelEvent() {
    this.init();
  }

  _getFilters() {
    const points = this._pointsModel.getPoints();

    return [
      {
        type: FilterType.EVERYTHING,
        name: `everything`,
        count: filterPoint[FilterType.EVERYTHING](points).length
      },
      {
        type: FilterType.FUTURE,
        name: `future`,
        count: filterPoint[FilterType.FUTURE](points).length
      },
      {
        type: FilterType.PAST,
        name: `past`,
        count: filterPoint[FilterType.PAST](points).length
      }
    ];
  }
}
