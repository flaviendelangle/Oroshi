import { combineReducers } from 'redux'

import results from './components/Results/reducer'
import { dialogs } from 'services/titles/interface'

const defaultState = {
  show: false
};

const main = (state = defaultState, action) => {
  
  switch(action.type) {
    case dialogs.addElement:
      return {
        ...state,
        show: action.show
      };
    default:
      return state;
  }
  
};

const reducer = combineReducers({
  main,
  results,
});


export default reducer;