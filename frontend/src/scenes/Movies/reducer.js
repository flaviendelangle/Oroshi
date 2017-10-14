import { combineReducers } from 'redux'

import dialogAddMovie from './components/DialogAddMovie/reducer'
import moviesTable from './components/MoviesTable/reducer'
import menu from './components/Menu/reducer'
import { MoviesAPI } from './api';

const addMovieToServer = (data) => {
  const directors = data.staff.crew
    .filter((element) => {
      return element.job === 'Director';
    })
    .map((element) => {
      return {
        tmdbId: element.id,
        name: element.name
      };
    });
  const movie = {
    directors,
    title: data.information.title,
    tmdbId: data.information.id
  };
  MoviesAPI.create(movie);
  
};

const main = (state = {}, action) => {

    switch(action.type) {
      case 'ADD_MOVIE_TO_SERVER':
        addMovieToServer(action.data);
        return state;
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