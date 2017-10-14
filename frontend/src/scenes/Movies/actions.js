import { MoviesAPI } from './api'

export const synchronizeMovies = () => {
  return {
    type: 'UPDATE_MOVIES',
    payload: MoviesAPI.list()
  }
};