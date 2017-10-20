import { combineReducers } from 'redux'

import poster from './components/Poster/reducer'

const main = (state = {}, action) => {
  switch(action.type) {
    default:
      return state;
  }
};

const reducer = combineReducers({
  main,
  poster
});


export default reducer;