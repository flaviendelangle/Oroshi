const defaultState = {
  movies: []
};

const moviesListReducer = (state = defaultState, action) => {
  
  switch(action.type) {
    case 'UPDATE_MOVIES' :
      return {
        ...state,
        movies: action.movies
      };
    default:
      return state;
  }
  
};

export default moviesListReducer;