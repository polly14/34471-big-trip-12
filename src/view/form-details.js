const createItemFormDetails = (offer) => {

  const {offerName, offerPrice, counter} = offer;

  return `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${counter}" type="checkbox" name="event-offer-luggage" >
    <label class="event__offer-label" for="event-offer-luggage-${counter}">
      <span class="event__offer-title">${offerName}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offerPrice}</span>
    </label>
  </div>`;
};

export const createFormDetails = (detailItems) => {
  const detailItemsTemplate = detailItems
    .map((offer, index) => createItemFormDetails(offer, index === 0))
    .join(``);

  return `<section class="event__details">
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${detailItemsTemplate}
      </div>
    </section>
  </section>`;
};
