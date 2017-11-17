import * as tmdb from './tmdb'
import { date } from '../../utils';

export const search = tmdb.search;

export const getRecommendations = tmdb.getRecommendations;

export const getPopular = tmdb.getPopular;

export const getTopRated = tmdb.getTopRated;

export const checkExistence = tmdb.checkExistence;

export const getDetails = tmdb.getDetails;

export const cleanDetails = (scene, details) => {
  const networks = details.networks
    .map(({id, name}) => ({tmdbId: id, name}));
  
  const genres = details.genres
    .map(({id, name}) => ({tmdbId: id, name}));
  
  const poster = details.images.posters.length === 0 ? '' : details.images.posters[0].file_path;
  
  return {
    networks,
    genres,
    title: details.name,
    tmdbId: details.id,
    note: details.vote_average,
    poster: poster,
    release: date(details.release_date, date.TMDB_FORMAT, date.YEAR_FORMAT)
  };
};