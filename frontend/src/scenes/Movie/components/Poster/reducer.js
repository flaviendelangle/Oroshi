const defaultState = {
  posters: []
};

const posterReducer = (state = defaultState, action) => {
  switch(action.type) {
    
    case 'LOAD_MOVIE_FULFILLED':
      return {
        ...state,
        posters: action.payload.images.posters
      };
    
    default:
      return state;
  }
  
};

export default posterReducer;