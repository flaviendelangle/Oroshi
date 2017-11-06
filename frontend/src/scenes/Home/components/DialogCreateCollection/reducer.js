import { combineReducers } from 'redux'

import moviesImporter from './components/MoviesImporter/reducer'

import { dialogs } from '../../../../services/actions/titles/interface'
import { collectionsMovies } from '../../../../services/actions/titles/api'

const defaultState = {
  isAddingACollection: false,
  collections: [],
  isImportingMovies: false
};

const main = (state = defaultState, action) => {
  
  switch(action.type) {
    
    case dialogs.createCollection:
      return {
        ...state,
        isAddingACollection: action.show
      };
      
    case collectionsMovies.importStarted:
      return {
        ...state,
        isImportingMovies: true
      };
      
    case collectionsMovies.importFinished:
      return {
        ...state,
        isImportingMovies: false
      };
  
    default:
      return state;
  }
  
};

const reducer = combineReducers({
  main,
  moviesImporter
});


export default reducer;