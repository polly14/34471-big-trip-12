import {getRandomInteger} from "../utils.js";

const offers = () => {
  const offersNames = [
    `Add luggage`,
    `Switch to comfort class`,
    `Add meal`,
    `Choose seats`,
    `Travel by train`
  ];

  return offersNames[getRandomInteger(0, offersNames.length - 1)];
};

const prices = () => {
  return getRandomInteger(10, 100);
};

let num = 0;

const counter = () => {
  return num++;
};

export const generateOffers = () => {
  return {
    offerName: offers(),
    offerPrice: prices(),
    counter: counter(),

  };

};
