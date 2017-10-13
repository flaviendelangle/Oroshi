import { combineReducers } from 'redux'

import dialogAddMovie from './components/DialogAddMovie/reducer'
import moviesTable from './components/MoviesTable/reducer'
import menu from './components/Menu/reducer'

const main = (state = {}, action) => {

    switch(action.type) {
      default:
        return state;
    }


};

const reducer = combineReducers({
  main,
  menu,
  dialogAddMovie,
  moviesTable
});


export default reducer;