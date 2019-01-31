const getAverage = arr =>
  arr.reduce((total, item) => total + item, 0) / arr.length;

export default getAverage;
