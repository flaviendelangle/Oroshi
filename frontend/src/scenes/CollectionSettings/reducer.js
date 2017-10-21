import { combineReducers } from 'redux'

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
  header,
});


export default reducer;