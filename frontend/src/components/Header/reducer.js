import { combineReducers } from 'redux'

import mainDrawer from './components/MainDrawer/reducer'

const defaultState = {};

const main = (state = defaultState, action) => {
  
  switch(action.type) {
    default:
      return state;
  }
  
  
};

const reducer = combineReducers({
  main,
  mainDrawer
});


export default reducer;