import MoviesAPI from '../../services/TheMovieDatabaseJS/movies'
import { movie } from '../../services/actions/titles/api'

export const loadMovie = (tmdbId) => {
  const options = {
    append_to_response: ['credits', 'images']
  };
  return {
    type: movie.load,
    payload: MoviesAPI.details(tmdbId, options)
  }
};