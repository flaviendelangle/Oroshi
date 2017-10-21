import { combineReducers } from 'redux'

import dialogAddMovie from './components/DialogAddMovie/reducer'
import moviesTable from './components/MoviesTable/reducer'
import menu from './components/Menu/reducer'
import header from './components/Header/reducer'

const defaultState = {};

const main = (state = defaultState, action) => {
    switch(action.type) {
      
      default:
        return state;
    }
};

const reducer = combineReducers({
  main,
  menu,
  dialogAddMovie,
  header,
  moviesTable
});


export default reducer;