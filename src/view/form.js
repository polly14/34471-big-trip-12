const createItemTypes = (item) => {

  return `<div class="event__type-item">
    <input id="event-type-${item.type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item.type.toLowerCase()}">
    <label class="event__type-label  event__type-label--${item.type.toLowerCase()}" for="event-type-${item.type.toLowerCase()}-1">${item.type}</label>
  </div>`;
};

export const createFormTemplate = (point) => {

  const typeItemsTemplate = (g) => {
    const typeItems = point.filter((item) => item.group === g)
      .map((item, index) => createItemTypes(item, index === 0))
      .join(``);
    return typeItems;
  };

  let pretext = ``;
  const typePretext = (i) => {
    if (point[i].group === `Transfer`) {
      pretext = `to`;
    }
    if (point[i].group === `Activity`) {
      pretext = `in`;
    }
    return pretext;
  };

  return `<form class="trip-events__item  event  event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${point[0].type.toLowerCase()}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Transfer</legend>
            ${typeItemsTemplate(`Transfer`)}
          </fieldset>

          <fieldset class="event__type-group">
            <legend class="visually-hidden">Activity</legend>
            ${typeItemsTemplate(`Activity`)}

          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${point[0].type} ${typePretext(0)}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="" list="destination-list-1">
        <datalist id="destination-list-1">
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
          <option value="Saint Petersburg"></option>
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">
          From
        </label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 00:00">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">
          To
        </label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 00:00">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
  </form>`;
};
