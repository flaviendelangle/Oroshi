import * as tmdb from './tmdb';
import { date } from '../../utils';

export const search = tmdb.search;

export const getRecommendations = tmdb.getRecommendations;

export const getPopular = tmdb.getPopular;

export const getTopRated = tmdb.getTopRated;

export const checkExistence = tmdb.checkExistence;

export const getDetails = tmdb.getDetails;

export const cleanDetails = (scene, details) => {
  const directors = details.credits.crew
    .filter(el => el.job === 'Director')
    .map(el => ({ tmdbId: el.id, name: el.name }));
  
  const genres = details.genres
    .map(({id, name}) => ({tmdbId: id, name}));
  
  const poster = details.images.posters.length === 0 ? '' : details.images.posters[0].file_path;
  
  return {
    directors,
    genres,
    title: details.title,
    tmdbId: details.id,
    note: details.vote_average,
    poster: poster,
    release: date(details.release_date, date.TMDB_FORMAT, date.YEAR_FORMAT),
    original_language: details.original_language
  };
};