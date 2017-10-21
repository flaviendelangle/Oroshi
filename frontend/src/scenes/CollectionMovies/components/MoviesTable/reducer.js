import { sort } from '../../services/utils'
import { addSeenToMovies, addCollectionToMovies } from '../../../CollectionSettings/services/utils'

const defaultState = {
  movies: [],
  collection: 0,
  found: false,
  loaded: false
};

const moviesListReducer = (state = defaultState, action) => {
  switch(action.type) {
    
    case 'LOAD_COLLECTION_FULFILLED':
      if(!action.payload) {
        return {
          ...state,
          found: false,
          loaded: true
        }
      }
      return {
        ...state,
        collection: action.payload.pk,
        movies: sort(action.payload.movies),
        found: true,
        loaded: true
      };
      
    case 'ADD_MOVIE_TO_COLLECTION_FULFILLED':
      return {
        ...state,
        movies: sort(addCollectionToMovies(state.collectionMovies.concat([action.payload]), state.collection))
      };
      
    case 'UPDATE_COLLECTION_MOVIE_FULFILLED':
      return {
        ...state,
        movies: addSeenToMovies(state.movies, action.payload)
      };
    default:
      return state;
  }
  
};

export default moviesListReducer;