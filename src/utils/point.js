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


