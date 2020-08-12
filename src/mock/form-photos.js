const generatePhoto = () => {
  const photoSrc = `http://picsum.photos/248/152?r=${Math.random()}`;
  return photoSrc;
};

export const generatePhotos = () => {
  return {
    destinationPhotos: generatePhoto(),

  };

};
