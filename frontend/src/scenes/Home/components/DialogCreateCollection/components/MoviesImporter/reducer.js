import { collections, collectionsMovies } from '../../../../../../services/actions/titles/api'

const defaultState = {
  moviesToImport: null,
  created: {}
};

const moviesImporterReducer = (state = defaultState, action) => {
  
  switch(action.type) {
    
    case collections.create + '_FULFILLED':
      if(!action.payload.importMovies) {
        return state;
      }
      return {
        ...state,
        moviesToImport: action.payload.movies
      };
    
    case collectionsMovies.add:
      return {
        ...state,
        created: {
          ...state.created,
          [action.data.tmdbId]: action.data
        }
      };
      
    default:
      return state;
  }
  
};

export default moviesImporterReducer;