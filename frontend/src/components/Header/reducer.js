import { combineReducers } from 'redux'

import mainDrawer from './components/MainDrawer/reducer'

const main = (state = {}, action) => {
  
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