import AbstractView from "./abstract.js";

let num = 0;
const createDayTemplate = (point) => {

  const counter = () => {
    return ++num;
  };

  return `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${counter()}</span>
        <time class="day__date" datetime="${point[2]}-${point[1]}-${point[0]}">${point[1]} ${point[0]}</time>
      </div>

    </li>`;
};

export default class Day extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createDayTemplate(this._points);
  }

}
