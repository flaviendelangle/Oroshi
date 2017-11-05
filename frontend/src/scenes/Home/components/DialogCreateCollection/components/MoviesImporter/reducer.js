import { dialogs } from '../../../../../../services/actions/titles/interface'

const defaultState = {
  moviesToImport: null
};

const moviesImporterReducer = (state = defaultState, action) => {
  
  switch(action.type) {
    
    case dialogs.importMoviesInCollectionCreation:
      return {
        ...state,
        moviesToImport: action.data
      };
    
    default:
      return state;
  }
  
};

export default moviesImporterReducer;