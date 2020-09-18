import AbstractView from "./abstract.js";

const createDayTemplate = (point, days) => {

  return `<div class="day__info">
      <span class="day__counter">${days}</span>
      <time class="day__date" datetime="${point[2]}-${point[1]}-${point[0]}">${point[1]} ${point[0]}</time>
    </div>`;
};

export default class DayInfo extends AbstractView {
  constructor(points, days) {
    super();
    this._points = points;
    this._days = days;
  }

  getTemplate() {
    return createDayTemplate(this._points, this._days);
  }

}
