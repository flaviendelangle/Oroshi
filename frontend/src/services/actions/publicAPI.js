import searchAPI from 'services/TheMovieDatabaseJS/search';
import { MoviesAPI } from 'services/api/movies';
import { MovieCollectionsAPI } from 'services/api/movieCollections';

import { _addMovieToCollection } from './api';

export const movies = {
  
  addElementToCollection: (data) => {
    return _addMovieToCollection(data);
  },
  
  search: (collection, query) => {
  
    const filterById = (movie, el) => {
      return movie.id === el.tmdbId;
    };
    
    let movies, IDs;
    return searchAPI.movies(query)
      .then(results => {
          movies = results;
          IDs = movies.results.map(el => el.id);
          if(IDs.length === 0) {
            throw new Error('No result for this search');
          }
          return MoviesAPI.serialize(IDs, 'tmdbId');
        })
          .then(exist => {
            for(let i = 0; i < movies.results.length; i++) {
              const match = exist.filter(filterById.bind(this, movies.results[i]));
              movies.results[i].local = (match.length > 0) ? match[0] : undefined;
            }
            return MovieCollectionsAPI.element(collection).movies.exist(IDs, 'tmdbId');
          })
          .catch(error => {
            return [];
          })
          .then(exist => {
            for(let i = 0; i < movies.results.length; i++) {
              movies.results[i].already_in_collection = exist[movies.results[i].id];
              movies.results[i].current_collection = collection;
            }
            return movies;
          })
          .catch(error => {
            return [];
          })
      }
};