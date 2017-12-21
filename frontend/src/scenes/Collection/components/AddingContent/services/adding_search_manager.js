/**
 * Set the "already_in_collection" to true for the element we just added to our collection
 * @param state
 * @param newElement
 * @returns state
 */
export const add = (state, newElement) => {
  if (!state.addingSearch) {
    return state;
  }
  
  const results = state.addingSearch.results.map(el => {
    if (el.getPublicId() === newElement.getPublicId()) {
      return newElement;
    }
    return el;
  });
  
  const addingSearch = {
    ...state.addingSearch,
    results
  };
  
  return {
    ...state,
    addingSearch
  };
};

export const remove = (state, newElement) => {
  if (!state.addingSearch) {
    return state;
  }
  
  const results = state.addingSearch.results.map(el => {
    if (el.getPublicId() === newElement.getPublicId()) {
      return newElement;
    }
    return el;
  });
  
  const addingSearch = {
    ...state.addingSearch,
    results
  };
  
  return {
    ...state,
    addingSearch
  };
};

export const merge = (state, newData) => {
  const oldData = state.addingSearch;
  if (!oldData || newData.page === 1) {
    return newData;
  }
  return {
    ...newData,
    results: oldData.results.concat(newData.results)
  }
};