import AbstractView from "./abstract.js";

let num = 0;
const createDayTemplate = (point, days) => {

  const counter = () => {
    return ++num;
  };

  if (num === days.length + 1) {
    num = 0;
  }

  const counterResult = counter();

  return `<div class="day__info">
      <span class="day__counter">${counterResult}</span>
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
