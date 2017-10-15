import { MoviesAPI } from './services/api'

export const listMovies = () => {
  return {
    type: 'UPDATE_MOVIES',
    payload: MoviesAPI.list()
  }
};

export const createMovie = (data) => {
  return {
    type: 'ADD_MOVIE_TO_SERVER',
      payload: MoviesAPI.create(data)
  }
};

export const updateMovie = (id, data) => {
  return {
    type: 'UPDATE_MOVIE',
    payload: MoviesAPI.partial_update(id, data)
  }
};