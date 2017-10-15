import { MoviesAPI } from './services/api'

export const synchronizeMovies = () => {
  return {
    type: 'UPDATE_MOVIES',
    payload: MoviesAPI.list()
  }
};