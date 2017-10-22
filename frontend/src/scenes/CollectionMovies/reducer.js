import { combineReducers } from 'redux'

import dialogAddMovie from './components/DialogAddMovie/reducer'
import moviesData from './components/MoviesData/reducer'
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
  moviesData
});


export default reducer;