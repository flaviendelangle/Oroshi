import { sort } from '../../services/utils'

const defaultState = {
  movies: []
};

const moviesListReducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'UPDATE_MOVIES_FULFILLED':
      return {
        ...state,
        movies: sort(action.payload)
      };
    case 'ADD_MOVIE_TO_COLLECTION_FULFILLED':
      console.log(action);
      return {
        ...state,
        movies: sort(state.movies.concat([action.payload]))
      };
    case 'UPDATE_MOVIE_FULFILLED':
      let movies = [].concat(state.movies).map((element) => {
        if(element.pk === action.payload.pk) {
          return action.payload;
        }
        return element;
      });
      return {
        ...state,
        movies: movies
      };
    default:
      return state;
  }
  
};

export default moviesListReducer;