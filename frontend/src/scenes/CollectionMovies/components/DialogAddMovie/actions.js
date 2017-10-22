import searchAPI from '../../../../services/TheMovieDatabaseJS/search'
import { MoviesAPI } from '../../../../services/api/movies'
import { CollectionsAPI } from '../../../../services/api/collections'

import { search } from '../../../../services/actions/titles/tmdb'
import { dialogs } from '../../../../services/actions/titles/interface'

export const showDialogAddMovie = show => {
  return {
    type: dialogs.addMovie,
    show
  };
};

export const searchMovies = (collection, query) => {
  let movies, IDs;
  return {
    type: search.movies,
    payload: searchAPI.movies(query)
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
        return CollectionsAPI.element(collection).movies.exist(IDs, 'tmdbId');
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



const filterById = (movie, el) => {
  return movie === el.tmdbId;
};