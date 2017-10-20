import MoviesAPI from '../../services/TheMovieDatabaseJS/movies'

export const loadMovie = (tmdbId) => {
  const options = {
    append_to_response: ['credits', 'images']
  };
  return {
    type: 'LOAD_MOVIE',
    payload: MoviesAPI.details(tmdbId, options).then(response => {
      return new Promise(resolve => {
        window.setTimeout(() => {
          resolve(response);
        }, 1000);
      });
    })
  }
};