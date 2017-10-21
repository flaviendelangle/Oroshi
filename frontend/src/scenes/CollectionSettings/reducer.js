import { combineReducers } from 'redux'

import exports from './components/Exports/reducer'
import header from './components/Header/reducer'

const defaultState = {};

const main = (state = defaultState, action) => {
  switch(action.type) {
    
    default:
      return state;
  }
};

const reducer = combineReducers({
  main,
  exports,
  header
});


export default reducer;