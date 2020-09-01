export const getCurrentDate = () => {
  const currentDate = new Date();

  return currentDate;
};

export const humanizeDate = (dueDate) => {
  return dueDate.toLocaleString(`en-GB`, {hour: `numeric`, minute: `numeric`});
};

export const humanizeYearMonthDay = (dueDate) => {
  return dueDate.toLocaleString(`en-GB`, {year: `2-digit`, month: `short`, day: `numeric`});
};

export const humanizeFull = (dueDate) => {
  return dueDate.toLocaleString(`en-GB`, {year: `2-digit`, month: `numeric`, day: `numeric`, hour: `numeric`, minute: `numeric`});
};

// Функция помещает задачи без даты в конце списка,
// возвращая нужный вес для колбэка sort
const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortPointTimeChange = (taskA, taskB) => {
  const weight = getWeightForNullDate(taskA.pointTime, taskB.pointTime);

  if (weight !== null) {
    return weight;
  }

  return taskB.pointTime - taskA.pointTime;
};

export const sortPointPriceChange = (taskA, taskB) => {
  const weight = getWeightForNullDate(taskA.pointPrice, taskB.pointPrice);

  if (weight !== null) {
    return weight;
  }

  return taskB.pointPrice - taskA.pointPrice;
};
