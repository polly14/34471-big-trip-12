import {TYPES} from "../const.js";
import {getRandomInteger} from "../utils/common.js";
import {shuffle} from "../utils/common.js";

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const getRandomPointType = () => {
  const randomIndex = getRandomInteger(0, TYPES.length - 1);
  return {
    type: TYPES[randomIndex].type,
    group: TYPES[randomIndex].group
  };
};

const generateDestination = () => {
  const destinations = [
    `Amsterdam`,
    `Geneva`,
    `Chamonix`
  ];
  const randomIndex = getRandomInteger(0, destinations.length - 1);
  return destinations[randomIndex];
};

const generateDestinationText = () => {
  const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`.split(`.`);
  const randomIndex = getRandomInteger(1, 5);
  const textBlock = shuffle(text).slice(0, randomIndex);
  return `${textBlock.map((it) => `${it}`).join(``)}`;
};

const generatePrice = () => {
  return getRandomInteger(10, 200);
};

const generateStartDate = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const startDate = new Date();
  startDate.setHours(getRandomInteger(0, 23), getRandomInteger(0, 59), 0, 999);
  startDate.setDate(startDate.getDate() + daysGap);
  return startDate;
};

const generateTime = () => {
  return getRandomInteger(10, 240);
};

export const generateRoutePoint = () => {

  return {
    pointType: getRandomPointType(),
    destination: generateDestination(),
    destinationText: generateDestinationText(),
    pointPrice: generatePrice(),
    pointStartTime: generateStartDate(),
    pointTime: generateTime(),
    isFavorite: false,
    id: generateId(),
  };
};
