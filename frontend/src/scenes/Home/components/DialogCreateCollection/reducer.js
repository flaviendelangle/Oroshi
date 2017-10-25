import { combineReducers } from 'redux'

import { dialogs } from '../../../../services/actions/titles/interface'

const defaultState = {
  isAddingACollection: false
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
  main
});


export default reducer;