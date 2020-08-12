export const createPointOffersTemplate = (offer) => {

  const {offerName, offerPrice} = offer;

  return `<li class="event__offer">
    <span class="event__offer-title">${offerName}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${offerPrice}</span>
  </li>`;
};
