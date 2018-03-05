const elementDimensions = [
  { min: 0, amount: 1 },
  { min: 461, amount: 2 },
  { min: 711, amount: 3 },
  { min: 1026, amount: 4 },
  { min: 1283, amount: 5 },
  { min: 1539, amount: 6 },
  { min: 1795, amount: 7 },
]

const coverDimensions = [
  { min: 0, amount: 1 },
  { min: 767, amount: 2 },
  { min: 1279, amount: 3 },
  { min: 1600, amount: 4 },
]

const getMatchingDimensions = (dimensions, width) => {
  const index = dimensions.findIndex(el => el.min > width)
  return dimensions[(index >= 0 ? index : dimensions.length) - 1]
}

const getElementMatchingDimensions = getMatchingDimensions.bind(this, elementDimensions)

const getCoverMatchingDimensions = getMatchingDimensions.bind(this, coverDimensions)

const getLineWidth = amount => (225 * amount) + 1

export const getLineDimensions = (width) => {
  const matchingDimensions = getElementMatchingDimensions(width)
  return {
    width,
    lineWidth: getLineWidth(matchingDimensions.amount),
    elementsPerLine: matchingDimensions.amount,
    coversPerLine: getCoverMatchingDimensions(width).amount,
  }
}

export default null
