import { combineReducers } from 'redux'

import dialogAddMovie from './components/DialogAddMovie/reducer'
import moviesTable from './components/MoviesTable/reducer'

const main = (state = {}, action) => {

    switch(action.type) {
      default:
        return state;
    }


};

const reducer = combineReducers({
  main,
  dialogAddMovie,
  moviesTable
});


export default reducer;