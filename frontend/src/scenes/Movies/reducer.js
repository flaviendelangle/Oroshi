import { combineReducers } from 'redux'

import dialogAddMovieReducer from './components/DialogAddMovie/reducer'

const moviesReducer = (state = {}, action) => {

    switch(action.type) {
      default:
        return state;
    }


};

const reducer = combineReducers({
  main: moviesReducer,
  dialogAddMovie: dialogAddMovieReducer
});


export default reducer;