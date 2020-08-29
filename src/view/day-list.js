import AbstractView from "./abstract.js";

const createDayListTemplate = () => {
  return `<ul class="trip-events__list"></ul>`;
};

export default class DayList extends AbstractView {

  getTemplate() {
    return createDayListTemplate();
  }

}
