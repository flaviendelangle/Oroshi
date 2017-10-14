import { combineReducers } from 'redux'

import moviesList from './components/MoviesList/reducer'
import form from './components/Form/reducer'

const defaultState = {
  isAddingAMovie: false
};

const main = (state = defaultState, action) => {
  
  switch(action.type) {
    case 'SHOW_DIALOG_ADD_MOVIE':
      return {
        ...state,
        isAddingAMovie: action.show
      };
    default:
      return state;
  }
  
};

const reducer = combineReducers({
  main,
  moviesList,
  form
});


export default reducer;