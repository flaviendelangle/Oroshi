import { combineReducers } from 'redux'

import contentImporter from './components/ContentImporter/reducer'

import { dialogs } from 'services/titles/interface'
import { collections } from 'services/titles/api'

const defaultState = {
  show: false,
  collections: [],
  isImportingContent: false
};

const main = (state = defaultState, action) => {
  
  switch(action.type) {
    
    case dialogs.createCollection:
      return {
        ...state,
        show: action.show
      };
      
    case collections.importStarted:
      return {
        ...state,
        isImportingContent: true
      };
      
    case collections.importFinished:
      return {
        ...state,
        isImportingContent: false
      };
  
    default:
      return state;
  }
  
};

const reducer = combineReducers({
  main,
  contentImporter
});


export default reducer;