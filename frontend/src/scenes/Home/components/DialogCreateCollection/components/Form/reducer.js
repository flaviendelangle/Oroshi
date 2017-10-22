import { combineReducers } from 'redux'

import identiconField from './components/IdenticonField/reducer'

const defaultState = {
};

const main = (state = defaultState, action) => {
  
  switch(action.type) {
    default:
      return state;
  }
  
};

const reducer = combineReducers({
  main,
  identiconField
});


export default reducer;