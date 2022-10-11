export const generateArray = ({ from = 0, to, length = to - from + 1 }) => {
  return Array.from({ length }, (_, i) => ({ hour: from + i * 1 }));
};
export const generateReservationArray = (available = [], reserved = []) => {
  let obj = {};
  let myList = available.forEach((elem) => {
    obj[elem.hour] = elem;
  });
  myList = reserved.forEach((elem) => {
    obj[elem.hour] = elem;
  });
  const array = Object.keys(obj).map((key) => obj[key]);
  return array;
};
