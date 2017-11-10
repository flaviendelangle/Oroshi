import { movieCollections, collections } from 'services/actions/titles/api'

const defaultState = {
  moviesToImport: null,
  created: {},
  keysNumber: 0,
  moviesNumber: 0,
  progress: 0
};


const moviesImporterReducer = (state = defaultState, action) => {
  
  switch(action.type) {
    
    case movieCollections.create + '_FULFILLED':
      if(!action.payload.importMovies) {
        return state;
      }
      const data = action.payload.movies;
      return {
        ...state,
        moviesToImport: data,
        moviesNumber: data.length
      };
    
    case collections.add:
      const keysNumber = state.keysNumber + 1;
      let progress = 0;
      if(state.moviesNumber > 0) {
        progress = keysNumber / state.moviesNumber * 100;
      }
      return {
        ...state,
        created: {
          ...state.created,
          [action.data.tmdbId]: action.data
        },
        keysNumber,
        progress
      };
      
    default:
      return state;
  }
  
};

export default moviesImporterReducer;