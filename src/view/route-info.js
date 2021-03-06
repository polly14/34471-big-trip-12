import AbstractView from "./abstract.js";

const createRouteInfoTemplate = (point, dest) => {

  const middle = () => {
    let middleText = `...`;
    if (dest.length > 3) {
      let newDest = dest.slice(1, dest.length - 2);

      if (newDest.length > 1) {
        middleText = `...`;
      }
      if (newDest.length === 1) {
        middleText = `${newDest[0]}`;
      }
    }

    return middleText;
  };

  return `<div class="trip-info__main">
    <h1 class="trip-info__title">${dest[0]} &mdash; ${middle()} &mdash; ${dest[dest.length - 1]}</h1>

    <p class="trip-info__dates">${point[0][1]} ${point[0][0]}&nbsp;&mdash;&nbsp;${point[point.length - 1][1]} ${point[point.length - 1][0]}</p>
  </div>`;
};

export default class RouteInfo extends AbstractView {
  constructor(point, dest) {
    super();
    this._point = point;
    this._dest = dest;
  }

  getTemplate() {
    return createRouteInfoTemplate(this._point, this._dest);
  }

}
