import { combineReducers } from 'redux'

import poster from './components/Poster/reducer'
import title from './components/Title/reducer'
import details from './components/Details/reducer'

const main = (state = {}, action) => {
  switch(action.type) {
    default:
      return state;
  }
};

const reducer = combineReducers({
  main,
  details,
  poster,
  title
});


export default reducer;