
const dimensions = [
  { min: 0, amount: 1 },
  { min: 461, amount: 2 },
  { min: 711, amount: 3 },
  { min: 1026, amount: 4 },
  { min: 1283, amount: 5 },
  { min: 1539, amount: 6 },
  { min: 1795, amount: 7 },
];

const getMatchingDimensions = (width) => {
  let i = 0;
  while (
    i < dimensions.length - 1 &&
    width > dimensions[i + 1].min
  ) {
    i += 1;
  }
  return dimensions[i];
};

const getLineWidth = amount => (225 * amount) + 1;

export const getLineDimensions = (width) => {
  const matchingDimensions = getMatchingDimensions(width);
  return {
    width,
    lineWidth: getLineWidth(matchingDimensions.amount),
    elementsPerLine: matchingDimensions.amount,
  };
};

export default null;
