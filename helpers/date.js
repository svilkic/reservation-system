export const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

export const genDaysFrom = (N) => {
  return [...Array(N).keys()].map((i) => i + 1);
};
