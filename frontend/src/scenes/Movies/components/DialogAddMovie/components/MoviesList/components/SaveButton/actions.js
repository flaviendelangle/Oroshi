import { MoviesAPI } from '../../../../../../services/api'

export const showButton = (show, id) => {
  return {
    type: 'UPDATE_SAVE_BUTTON_VISIBILITY',
    id,
    show
  };
};

export const addMovieToServer = data => {
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
  return {
    type: 'ADD_MOVIE_TO_SERVER',
    payload: MoviesAPI.create(movie)
  };
};