import { CollectionsAPI } from '../../services/api/collections'
import { MoviesAPI } from '../../services/api/movies'
import MoviesTMDB from '../../services/TheMovieDatabaseJS/movies'

import * as titles from './titles/api'
import { date } from '../utils'

/*
  COLLECTIONS
 */

export const _loadCollection = pk => {
  return {
    type: titles.collections.load,
    payload: CollectionsAPI.retrieve(pk)
      .then(response => {
        return response;
      })
      .catch(error => {
        error = error.toString();
        if(error === 'Error: Not Found') {
          return undefined;
        }
      })
  }
};

export const _loadCollectionSettings = pk => {
  return {
    type: titles.collections.loadSettings,
    payload: CollectionsAPI.settings(pk)
  }
};

/*
  COLLECTION'S MOVIES
 */
export const _addMovieToCollection = data => {
  
  return {
    type: titles.collectionsMovies.add,
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

export const _updateMovieInCollection = (collection, id, data) => {
  return {
    type: titles.collectionsMovies.update,
    payload: CollectionsAPI.element(collection).movies.partial_update(id, data)
  }
};





/*
  MOVIES
 */

const createMovie = data => {
  if(data.local) {
    return Promise.resolve({
      data: data.local,
      collection: data.current_collection
    });
  }
  const options = {
    append_to_response: ['credits', 'images']
  };
  return MoviesTMDB.details(data.id, options)
    .then(results => {
      const directors = results.credits.crew
        .filter(el => el.job === 'Director')
        .map(el => ({ tmdbId: el.id, name: el.name }));
      
      const genres = results.genres
        .map(({id, name}) => ({tmdbId: id, name}));
      
      const poster = results.images.posters.length === 0 ? '' : results.images.posters[0].file_path;
      
      const movie = {
        directors,
        genres,
        title: results.title,
        tmdbId: results.id,
        note: results.vote_average,
        poster: poster,
        release: date(results.release_date, date.TMDB_FORMAT, date.YEAR_FORMAT)
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
