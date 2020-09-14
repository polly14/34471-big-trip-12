import moment from "moment";

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

export const formatHumanizeDate = (dueDate) => {
  if (!(dueDate instanceof Date)) {
    return ``;
  }
  return moment(dueDate).format(`HH:mm`);
};

export const formatHumanizeYearMonthDay = (dueDate) => {
  if (!(dueDate instanceof Date)) {
    return ``;
  }
  return moment(dueDate).format(`YY MM DD HH:mm`);
};

export const formatHumanizeFull = (dueDate) => {
  if (!(dueDate instanceof Date)) {
    return ``;
  }
  return moment(dueDate).format(`YY MM DD HH:mm`);
};

export const getDuration = (startTime, endTime) => {
  const dateB = moment(endTime);
  const dateC = moment(startTime);
  const duration = dateB.diff(dateC);
  if (duration > 1440) {
    return moment(duration).format(`DD[D] HH[H] mm[M]`);
  }
  if (duration > 60) {
    return moment(duration).format(`HH[H] mm[M]`);
  } else {
    return moment(duration).format(`mm[M]`);
  }

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
