import { combineReducers } from 'redux'

import mainDrawer from './components/MainDrawer/reducer'

const defaultState = {};

const main = (state = defaultState, action) => {
  
  switch(action.type) {
    case 'UPDATE_LOCATION' :
      return {
        ...state,
      };
    default:
      return state;
  }
  
  
};

const reducer = combineReducers({
  main,
  mainDrawer
});


export default reducer;