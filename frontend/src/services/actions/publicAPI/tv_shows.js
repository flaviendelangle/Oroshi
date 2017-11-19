import * as tmdb from './tmdb'
import { date } from '../../utils';
import { request } from 'services/titles/publicAPI';

import TVSeasonsTMDB from 'services/TheMovieDatabaseJS/tv_seasons';

export const search = tmdb.search;

export const getRecommendations = tmdb.getRecommendations;

export const getPopular = tmdb.getPopular;

export const getTopRated = tmdb.getTopRated;

export const checkExistence = tmdb.checkExistence;

export const getDetails = tmdb.getDetails;

export const getTitle = tmdb.getTitle;

export const getPoster = tmdb.getPoster;

export const getSeasonDetails = (tmdbId, season) => {
  return {
    type: request.get_season_details,
    payload: TVSeasonsTMDB.details(tmdbId, season),
    meta: {
      tv_shows_id: tmdbId,
      season
    }
  }
};

export const cleanDetails = (scene, details) => {
  const networks = details.networks
    .map(({id, name}) => ({tmdbId: id, name}));
  
  const genres = details.genres
    .map(({id, name}) => ({tmdbId: id, name}));
  
  return {
    networks,
    genres,
    tmdbId: details.id,
    note: details.vote_average,
    posters: details.posters,
    titles: details.titles,
    release: date(details.release_date, date.TMDB_FORMAT, date.YEAR_FORMAT),
    original_language: details.original_language
  };
};