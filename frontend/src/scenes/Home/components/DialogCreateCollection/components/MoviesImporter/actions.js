import { dialogs } from 'services/titles/interface'
import { collections } from 'services/titles/api'
import { _addMovieToCollection } from 'services/actions/api'


export const importMovies = (dispatch, movies) => {
  console.log(movies[0].current_collection);
  dispatch({
    type: collections.importStarted
  });
  return {
    type: dialogs.importMoviesInCollectionCreation,
    payload: importMovie(dispatch, movies, 0)
  }
};

const importMovie = (dispatch, movies, index) => {
  if(movies.length <= index) {
    dispatch({
      type: collections.importFinished
    });
    return true;
  }
  const movie = movies[index];
  return _addMovieToCollection(movie).payload.then(el => {
    dispatch({
      type: collections.add,
      data: el
    });
    importMovie(dispatch, movies, ++index);
  });
};