import searchAPI from '../../../../services/TheMovieDatabaseJS/search'
import { MoviesAPI } from '../../../../services/api/movies'
import { CollectionsAPI } from '../../../../services/api/collections'

export const showDialogAddMovie = show => {
  return {
    type: 'SHOW_DIALOG_ADD_MOVIE',
    show
  };
};

export const searchMovies = (collection, query) => {
  let movies, IDs;
  return {
    type: 'SEARCH_MOVIE_TMDB',
    payload: searchAPI.movies(query)
      .then((response) => {
        movies = response;
        IDs = movies.results.map((element) => {
          return element.id;
        });
        return MoviesAPI.serialize(IDs, 'tmdbId');
      })
      .then((exist) => {
        for(let i = 0; i < movies.results.length; i++) {
          const match = exist.filter((el) => {
            return movies.results[i].id === el.tmdbId;
          });
          movies.results[i].local = (match.length > 0) ? match[0] : undefined;
        }
        return CollectionsAPI.element(collection).movies.exist(IDs, 'tmdbId');
      })
      .then((exist) => {
        for(let i = 0; i < movies.results.length; i++) {
          movies.results[i].already_in_collection = exist[movies.results[i].id];
          movies.results[i].current_collection = collection;
        }
        return movies;
      })
  }
};