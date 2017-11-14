import searchAPI from 'services/TheMovieDatabaseJS/search';
import { getCollectionAPI, getElementAPI } from 'services/actions/collections';

const tmdb = {
  
  search: (scene, collection, query) => {
    const searchKey = (scene === 'movies') ? 'movies' : 'tvShow';
  
    const filterById = (movie, el) => {
      return movie.id === el.tmdbId;
    };
  
    let elements, IDs;
    return searchAPI[searchKey](query)
      .then(results => {
        elements = results;
        IDs = elements.results.map(el => el.id);
        if(IDs.length === 0) {
          throw new Error('No result for this search');
        }
        return getElementAPI(scene).serialize(IDs, 'tmdbId');
      })
      .then(exist => {
        for(let i = 0; i < elements.results.length; i++) {
          const match = exist.filter(filterById.bind(this, elements.results[i]));
          elements.results[i].local = (match.length > 0) ? match[0] : undefined;
        }
        return getCollectionAPI(scene).element(collection)[scene].exist(IDs, 'tmdbId');
      })
      .catch(error => {
        return [];
      })
      .then(exist => {
        for(let i = 0; i < elements.results.length; i++) {
          elements.results[i].already_in_collection = exist[elements.results[i].id];
          elements.results[i].current_collection = collection;
        }
        return elements;
      })
      .catch(error => {
        return [];
      })
  }
  
};


export const movies = {
  search: (collection, query) => tmdb.search('movies', collection, query)
};

export const tv_shows = {
  search: (collection, query) => tmdb.search('tv_shows', collection, query)
};