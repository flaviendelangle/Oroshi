const defaultState = {
  movies: []
};

const moviesListReducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'UPDATE_MOVIES_FULFILLED':
      return {
        ...state,
        movies: action.payload
      };
    case 'ADD_MOVIE_TO_SERVER_FULFILLED':
      return {
        ...state,
        movies: state.movies.concat([action.payload])
      };
    default:
      return state;
  }
  
};

export default moviesListReducer;