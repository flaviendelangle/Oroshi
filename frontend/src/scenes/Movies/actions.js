import { CollectionsAPI } from '../../services/api/collections'
import { MoviesAPI } from '../../services/api/movies'
import MoviesTMDB from '../../services/TheMovieDatabaseJS/movies'

import { loadCollection as loadCollectionOriginal } from '../Collection/actions'

export const loadCollection = collection_id => {
  return loadCollectionOriginal(collection_id);
};

export const createMovie = data => {
  if(data.local) {
    return Promise.resolve({
      data: data.local,
      collection: data.current_collection
    });
  }
  const options = {
    append_to_response: 'credits'
  };
  return MoviesTMDB.details(data.id, options)
    .then(results => {
      const directors = results.credits.crew
        .filter(el => el.job === 'Director')
        .map(el => ({ tmdbId: el.id, name: el.name }));
      
      const genres = results.genres
        .map(({id, name}) => ({tmdbId: id, name}));
      const movie = {
        directors,
        genres,
        title: results.title,
        tmdbId: results.id,
        note: results.vote_average
      };
      return MoviesAPI.create(movie);
    })
    .then(response => {
      return {
        data: response,
        collection: data.current_collection
      }
    })
};

export const updateCollectionMovie = (collection, id, data) => {
  return {
    type: 'UPDATE_COLLECTION_MOVIE',
    payload: CollectionsAPI.element(collection).movies.partial_update(id, data)
  }
};

export const addMovieToCollection = data => {
  
  return {
    type: 'ADD_MOVIE_TO_COLLECTION',
    payload: createMovie(data)
      .then(response => {
        data = {
          pk: response.data.pk
        };
        return CollectionsAPI.element(response.collection).movies.create(data);
      })
      .then(response => {
        return {
          ...response,
          seen: false
        }
      })
  }

};