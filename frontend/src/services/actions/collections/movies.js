import * as tmdb from './tmdb'

import { MoviesAPI } from 'services/api/movies';
import { MovieCollectionsAPI } from 'services/api/movieCollections';
import MoviesTMDB from 'services/TheMovieDatabaseJS/movies'

import { date } from 'services/utils'

export const collectionAPI = MovieCollectionsAPI;

export const elementAPI = MoviesAPI;

export const publicAPI = MoviesTMDB;

export const addElement = data => {
  return _createMovie(data)
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
};


const _createMovie = data => {
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