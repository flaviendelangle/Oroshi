/**
 * Set the "already_in_collection" to true for the element we just added to our collection
 * @param state
 * @param newElement
 * @returns state
 */
export const add = (state, newElement) => {
  if(!state.recommendations) {
    return state;
  }
  
  const results = state.recommendations.results.map(section => {
    return {
      ...section,
      content: section.content.map(el => {
        if(el.id === newElement.tmdbId) {
          el.already_in_collection = true;
          el.local = newElement;
        }
        return el;
      })
    }
  });
  
  const recommendations = {
    ...state.recommendations,
    results
  };
  
  return {
    ...state,
    recommendations
  };
};

export const remove = (state, newElement) => {
  if(!state.recommendations) {
    return state;
  }
  
  const results = state.recommendations.results.map(section => {
    return {
      ...section,
      content: section.content.map(el => {
        if(el.id === newElement.tmdbId) {
          el.already_in_collection = false;
        }
        return el;
      })
    }
  });
  
  const recommendations = {
    ...state.recommendations,
    results
  };
  
  return {
    ...state,
    recommendations
  };

};
