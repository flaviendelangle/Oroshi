import { combineReducers } from 'redux'

import { users } from 'services/titles/api'

const defaultState = {
};

const main = (state = defaultState, action) => {

  switch(action.type) {
    
    case users.create + '_FULFILLED':
      if (action.payload.error) {
        return {
          state
        }
      }
      return {
        state,
      };
    
    default:
      return state;
  }
};

const reducer = combineReducers({
  main,
});


export default reducer;