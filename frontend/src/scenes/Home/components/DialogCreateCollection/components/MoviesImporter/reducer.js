import { collections, collectionsMovies } from '../../../../../../services/actions/titles/api'

const defaultState = {
  moviesToImport: null
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
      console.log(action.data.title);
      return state;
      
    default:
      return state;
  }
  
};

export default moviesImporterReducer;