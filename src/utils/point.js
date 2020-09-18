import moment from "moment";

export const getCurrentDate = () => {
  const currentDate = new Date();

  return currentDate;
};

export const isDatePast = (date) => {
  if (date > getCurrentDate()) {
    return true;
  }
  return false;
};
export const isDateFuture = (date) => {
  if (date < getCurrentDate()) {
    return true;
  }
  return false;
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

export const getDuration = (dateB, dateC) => {

  const b = moment(dateB);
  const a = moment(dateC);

  const minut = a.diff(b, `minutes`);
  const hours = a.diff(b, `hours`);
  const days = a.diff(b, `days`);

  if (days > 0) {
    return `${days}D ${hours - (days * 24)}H ${minut - (hours * 60)}M`;
  } else if (hours > 0) {
    return `${hours - (days * 24)}H ${minut - (hours * 60)}M`;
  } else {
    return `${minut - (hours * 60)}M`;
  }

};

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

export const sortDefault = (a, b) => {

  if (a.pointStartTime > b.pointStartTime) {
    return 1;
  }
  if (a.pointStartTime < b.pointStartTime) {
    return -1;
  }
  return 0;

};

export const sortPointTimeChange = (taskA, taskB) => {

  taskA.duration = moment(taskA.pointStartTime).diff(moment(taskA.pointEndTime));
  taskB.duration = moment(taskB.pointStartTime).diff(moment(taskB.pointEndTime));

  const weight = getWeightForNullDate(taskA.duration, taskB.duration);

  if (weight !== null) {
    return weight;
  }

  return taskA.duration - taskB.duration;
};

export const sortPointPriceChange = (taskA, taskB) => {
  const weight = getWeightForNullDate(taskA.pointPrice, taskB.pointPrice);

  if (weight !== null) {
    return weight;
  }

  return taskB.pointPrice - taskA.pointPrice;
};

export const isDatesEqual = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return true;
  }

  return moment(dateA).isSame(dateB, `day`);
};
