import { MovieCollectionsAPI } from 'services/api/movieCollections'
import { MoviesAPI } from 'services/api/movies'
import { TVShowCollectionsAPI } from 'services/api/tvShowsCollections'
import { TVShowsAPI } from 'services/api/tvShows'
import { getCollectionAPI } from 'services/api/collections'
import MoviesTMDB from 'services/TheMovieDatabaseJS/movies'
import TVShowsTMDB from 'services/TheMovieDatabaseJS/tv'

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
      }),
    meta: {
      scene
    }
  }
};

export const _loadCollectionSettings = pk => {
  return {
    type: titles.collectionContent.loadSettings,
    payload: MovieCollectionsAPI.settings(pk)
  }
};


export const _addElementToCollection = (scene, data) => {
  
  const methods = {
    
    movies: data => {
      return createMovie(data)
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
    },
    
    tv_shows: data => {
      return createTVShow(data)
        .then(response => {
          data = {
            pk: response.data.pk,
            seen: data.seen
          };
          return TVShowCollectionsAPI.element(response.collection).tv_shows.create(data);
        })
        .then(response => {
          return {
            ...response,
            seen: data.seen
          }
        })
    }
    
  };
  
  if(!data.hasOwnProperty('seen')) {
    data.seen = false;
  }
  return {
    type: titles.collections.add,
    payload: methods[scene](data),
    meta: {
      scene
    }
  }
  
};

export const _updateElementInCollection = (scene, collection, id, data) => {
  return {
    type: titles.collections.update,
    payload: getCollectionAPI(scene).element(collection)[scene].partial_update(id, data),
    meta: {
      scene
    }
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



/*
  TV SHOWS
 */

const createTVShow = data => {
  if(data.local) {
    return Promise.resolve({
      data: data.local,
      collection: data.current_collection
    });
  }
  const options = {
    append_to_response: ['credits', 'images', 'lists']
  };
  return TVShowsTMDB.details(data.id, options)
    .then(results => {
      
      const networks = results.networks
        .map(({id, name}) => ({tmdbId: id, name}));

      const genres = results.genres
        .map(({id, name}) => ({tmdbId: id, name}));
      
      const poster = results.images.posters.length === 0 ? '' : results.images.posters[0].file_path;
      
      const movie = {
        networks,
        genres,
        title: results.title,
        tmdbId: results.id,
        note: results.vote_average,
        poster: poster,
        release: date(results.release_date, date.TMDB_FORMAT, date.YEAR_FORMAT)
      };
      
      return TVShowsAPI.create(movie);
    })
    .then(response => {
      console.log(response);
      return {
        data: response,
        collection: data.current_collection
      }
    })
};