import { MovieCollectionsAPI } from 'services/api/movieCollections'
import { MoviesAPI } from 'services/api/movies'
import { getCollectionAPI } from 'services/api/collections'
import MoviesTMDB from 'services/TheMovieDatabaseJS/movies'

import * as titles from 'services/titles/api'
import { date } from 'services/utils'

/*
  COLLECTIONS
 */

export const _loadCollection = (scene, pk) => {
  return {
    type: titles.collectionContent.load,
    payload: getCollectionAPI(scene).retrieve(pk)
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
    type: titles.collectionContent.loadSettings,
    payload: MovieCollectionsAPI.settings(pk)
  }
};

/*
  COLLECTION'S MOVIES
 */
export const _addMovieToCollection = data => {
  
  if(!data.hasOwnProperty('seen')) {
    data.seen = false;
  }
  return {
    type: titles.collections.add,
    payload: createMovie(data)
      .then(response => {
        data = {
          pk: response.data.pk,
          seen: data.seen
        };
        return MovieCollectionsAPI.element(response.collection).movies.create(data);
      })
      .then(response => {
        return {
          ...response,
          seen: data.seen
        }
      })
  }
};

export const _updateMovieInCollection = (collection, id, data) => {
  return {
    type: titles.collections.update,
    payload: MovieCollectionsAPI.element(collection).movies.partial_update(id, data)
  }
};

export const _removeMovieFromCollection = (collection, id) => {
  return {
    type: titles.collections.remove,
    payload: MovieCollectionsAPI.element(collection).movies.destroy(id)
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
    append_to_response: ['credits', 'images', 'lists']
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
