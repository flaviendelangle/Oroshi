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
  let details;
  return MoviesTMDB.details(data.id)
    .then(results => {
      details = results;
      return MoviesTMDB.credits(data.id);
    })
    .then(credits => {
      const directors = credits.crew
        .filter(el => el.job === 'Director')
        .map(el => ({ tmdbId: el.id, name: el.name }));
      
      const movie = {
        directors,
        title: details.title,
        tmdbId: details.id
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