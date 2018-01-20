/**
 * Set the "already_in_collection" to true for the element we just added to our collection
 * @param state
 * @param newElement
 * @returns state
 */
export const add = (state, newElement) => {
  if (!state.recommendations) {
    return state;
  }

  const results = state.recommendations.results.map(section => ({
    ...section,
    content: section.content.map((el) => {
      if (el.getPublicId() === newElement.getPublicId()) {
        return newElement;
      }
      return el;
    }),
  }));

  const recommendations = {
    ...state.recommendations,
    results,
  };

  return {
    ...state,
    recommendations,
  };
};

export const remove = (state, newElement) => {
  if (!state.recommendations) {
    return state;
  }

  const results = state.recommendations.results.map(section => ({
    ...section,
    content: section.content.map((el) => {
      if (el.getPublicId() === newElement.getPublicId()) {
        return newElement;
      }
      return el;
    }),
  }));

  const recommendations = {
    ...state.recommendations,
    results,
  };

  return {
    ...state,
    recommendations,
  };
};

export const merge = (state, _newData, type) => {
  const oldData = state.recommendations.results.find(el => el.type === type);
  const otherData = state.recommendations.results.filter(el => el.type !== type);

  const newData = _newData;
  newData.content = oldData.content.concat(newData.content);

  const recommendations = {
    ...state.recommendations,
    results: [
      ...otherData,
      newData,
    ],
  };

  return {
    ...state,
    recommendations,
  };
};
