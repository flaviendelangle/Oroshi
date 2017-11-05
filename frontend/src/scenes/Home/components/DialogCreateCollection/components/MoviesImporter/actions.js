import { dialogs } from '../../../../../../services/actions/titles/interface'
import { collectionsMovies } from '../../../../../../services/actions/titles/api'
import { _addMovieToCollection } from '../../../../../../services/actions/api'


export const importMovies = (dispatch, movies) => {
  console.log(movies[0].current_collection);
  return {
    type: dialogs.importMoviesInCollectionCreation,
    payload: importMovie(dispatch, movies)
  }
};

const importMovie = (dispatch, movies) => {
  if(movies.length === 0) {
    return true;
  }
  const movie = movies.shift();
  return _addMovieToCollection(movie).payload.then(el => {
    dispatch({
      type: collectionsMovies.add,
      data: el
    });
    importMovie(dispatch, movies);
  });
};