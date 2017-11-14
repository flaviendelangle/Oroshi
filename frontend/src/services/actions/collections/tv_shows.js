import { TVShowsAPI } from 'services/api/tvShows';
import { TVShowCollectionsAPI } from 'services/api/tvShowsCollections';
import TVShowsTMDB from 'services/TheMovieDatabaseJS/tv'

import { date } from 'services/utils'

export const collectionAPI = TVShowCollectionsAPI;

export const elementAPI = TVShowsAPI;

export const publicAPI = TVShowsTMDB;

export const addElementToCollection = data => {
  return _createTVShow(data)
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
};

const _createTVShow = data => {
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
      console.log(results);
      const movie = {
        networks,
        genres,
        title: results.name,
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