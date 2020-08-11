let num = 0;
const createItemDay = (point) => {

  const counter = () => {
    return ++num;
  };

  return `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${counter()}</span>
        <time class="day__date" datetime="${point[2]}-${point[1]}-${point[0]}">${point[1]} ${point[0]}</time>
      </div>
      <ul class="trip-events__list"></ul>
    </li>`;
};

export const createDaysTemplate = (dayItems) => {

  const dayItemsTemplate = dayItems
    .map((point, index) => createItemDay(point, index === 0))
    .join(``);

  return `${dayItemsTemplate}`;
};
