/**
 * Set the "already_in_collection" to true for the element we just added to our collection
 * @param state
 * @param newElement
 * @returns state
 */
export const add = (state, newElement) => {
  if(!state.addingSearch) {
    return state;
  }
  
  const results = state.addingSearch.results.map(el => {
    if(el.id === newElement.tmdbId) {
      el.already_in_collection = true;
      el.local = newElement;
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
  if(!state.addingSearch) {
    return state;
  }
  
  const results = state.addingSearch.results.map(el => {
    if(el.id === newElement.tmdbId) {
      el.already_in_collection = false;
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