import { combineReducers } from 'redux'

import moviesList from './components/Results/reducer'
import { dialogs } from 'services/actions/titles/interface'

const defaultState = {
  isAddingAMovie: false
};

const main = (state = defaultState, action) => {
  
  switch(action.type) {
    case dialogs.addMovie:
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
});


export default reducer;