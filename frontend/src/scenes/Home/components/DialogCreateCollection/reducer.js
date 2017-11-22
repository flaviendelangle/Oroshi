import { combineReducers } from 'redux'

import { dialogs } from 'services/titles/interface'

const defaultState = {
  show: true,
  collections: [],
};

const main = (state = defaultState, action) => {
  
  switch(action.type) {
    
    case dialogs.createCollection:
      return {
        ...state,
        show: action.show
      };
      
    default:
      return state;
  }
  
};

const reducer = combineReducers({
  main
});


export default reducer;