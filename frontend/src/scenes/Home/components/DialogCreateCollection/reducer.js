import { combineReducers } from 'redux'

import moviesImporter from './components/MoviesImporter/reducer'

import { dialogs } from '../../../../services/actions/titles/interface'

const defaultState = {
  isAddingACollection: true,
  collections: [],
};

const main = (state = defaultState, action) => {
  
  switch(action.type) {
    
    case dialogs.createCollection:
      return {
        ...state,
        isAddingACollection: action.show
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