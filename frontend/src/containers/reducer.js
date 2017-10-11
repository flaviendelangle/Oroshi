import { combineReducers } from 'redux'

import moviesReducer from '../scenes/Movies/reducer'

const reducer = combineReducers({
  movies: moviesReducer
});

export default reducer;