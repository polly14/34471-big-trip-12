export const createFormPhotos = (point) => {

  const {destinationPhotos} = point;

  return `<img class="event__photo" src="${destinationPhotos}" alt="Event photo">`;
};
