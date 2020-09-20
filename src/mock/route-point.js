import {TYPES, DESTINATIONS, OFFERS} from "../const.js";
import {getRandomInteger} from "../utils/common.js";

export const generateOffer = () => {
  const randomOffer = OFFERS[getRandomInteger(0, OFFERS.length - 1)].offers;
  const offersList = new Array(randomOffer.length).fill().map(() => ({title: randomOffer[getRandomInteger(0, randomOffer.length - 1)].title, price: getRandomInteger(10, 100), isOfferChecked: getRandomInteger(0, 1)}));
  return offersList;
};

export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const getRandomPointType = () => {
  const randomIndexTypes = getRandomInteger(0, TYPES.length - 1);
  return TYPES[randomIndexTypes];
};

const generateDestination = () => {
  const randomIndexDest = getRandomInteger(0, DESTINATIONS.length - 1);
  return DESTINATIONS[randomIndexDest].name;
};

const generateDescription = () => {
  const randomIndexDest = getRandomInteger(0, DESTINATIONS.length - 1);
  return DESTINATIONS[randomIndexDest].description;
};

export const generatePhotos = () => {
  const randomIndexDest = getRandomInteger(0, DESTINATIONS.length - 1);
  return DESTINATIONS[randomIndexDest].pictures;
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

const generateEndDate = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const endDate = new Date();
  endDate.setHours(getRandomInteger(0, 23), getRandomInteger(0, 59), 0, 999);
  endDate.setDate(endDate.getDate() + daysGap);
  return endDate;
};

export const generateRoutePoint = () => {

  return {
    pointType: getRandomPointType(),
    destination: generateDestination(),
    description: generateDescription(),
    photos: generatePhotos(),
    pointPrice: generatePrice(),
    pointStartTime: generateStartDate(),
    pointEndTime: generateEndDate(),
    isFavorite: false,
    id: generateId(),
    offersList: generateOffer(),
  };
};
