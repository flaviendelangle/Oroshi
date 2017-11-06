import { CollectionsAPI } from '../../services/api/collections'
import { MoviesAPI } from '../../services/api/movies'

import { collections } from '../../services/actions/titles/api'

export const createCollection = (data, moviesToImport)  => {
  let promise;
  if(moviesToImport) {
    promise = updateMoviesToImport(data, moviesToImport)
  } else {
    promise = CollectionsAPI.create(data).then(collection => {
      return {
        importMovies: false,
        collection
      };
    });
  }
  return {
    type: collections.create,
    payload: promise
  };
};

export const loadCollections = () => {
  return {
    type: collections.loadAllSettings,
    payload: CollectionsAPI.settings()
  }
};

const updateMoviesToImport = (data, moviesToImport) => {
  let collection, movies;
  return moviesToImport
    .then(response => {
      movies = response;
      return CollectionsAPI.create(data)
    })
    .then(response => {
      collection = response;
      const IDs = movies.map(el => el.tmdbId);
      return MoviesAPI.serialize(IDs, 'tmdbId')
    })
    .then(exist => {
      for(let i = 0; i < movies.length; i++) {
        const match = exist.filter(filterById.bind(this, movies[i]));
        movies[i].local = (match.length > 0) ? match[0] : undefined;
        movies[i].current_collection = collection.pk;
        movies[i].id = parseInt(movies[i].tmdbId, 10);
        movies[i].release = parseInt(movies[i].release, 10);
      }
      return {
        importMovies: true,
        movies,
        collection
      };
    })
};

const filterById = (movie, el) => {
  return parseInt(movie.tmdbId, 10) === el.tmdbId;
};