import { CollectionsAPI } from '../../services/api/collections'
import { MoviesAPI } from '../../services/api/movies'
import MoviesTMDB from '../../services/TheMovieDatabaseJS/movies'

export const listMovies = (collection_id) => {
  return {
    type: 'UPDATE_MOVIES',
    payload: CollectionsAPI.element(collection_id).movies.list()
  }
};

export const createMovie = (data) => {
  if(data.local) {
    return Promise.resolve({
      data: data.local,
      collection: data.current_collection
    });
  }
  let details;
  MoviesTMDB.details(data.id)
    .then((response) => {
      details = response;
      return MoviesTMDB.credits(data.id);
    })
    .then((credits) => {
      const directors = credits.crew
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
      
      return MoviesAPI.create(movie);
    })
    .then((response) => {
      return {
        data: response,
        collection: data.current_collection
      }
    })
};

export const updateMovie = (id, data) => {
  return {
    type: 'UPDATE_MOVIE',
    payload: MoviesAPI.partial_update(id, data)
  }
};

export const addMovieToCollection = (data) => {
  
  return {
    type: 'ADD_MOVIE_TO_COLLECTION',
    payload: createMovie(data)
      .then((response) => {
        data = {
          pk: response.data.pk
        };
        return CollectionsAPI.element(response.collection).movies.create(data);
      })
  }

};