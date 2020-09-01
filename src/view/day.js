import AbstractView from "./abstract.js";

const createDayTemplate = () => {

  return `<li class="trip-days__item  day"></li>`;
};

export default class Day extends AbstractView {


  getTemplate() {
    return createDayTemplate();
  }

}
