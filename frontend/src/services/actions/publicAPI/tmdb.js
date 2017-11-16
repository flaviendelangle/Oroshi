import { getElementAPI, getCollectionAPI, getPublicAPI } from 'services/actions/collections';

import searchAPI from 'services/TheMovieDatabaseJS/search';
import { search as searchOriginal, getPopular as getPopularOriginal, getTopRated as getTopRatedOriginal } from './index';

export const search = (scene, collection, query, page) => {
  const searchKey = getSearchKey(scene);
  return searchAPI[searchKey](query, {page})
    .then(elements => {
      return prepareSearchResults(scene, collection, elements, query)
    });
};

export const getRecommendations = (scene, collection) => {
  
  let elements = [];
  
  return _getPopular(scene, collection)
    .then(results => {
      elements.push(results);
      return _getTopRated(scene, collection)
    })
    .then(results => {
      elements.push(results);
      return {
        results: elements
      };
    });
};

export const getPopular = (scene, collection, page) => {
  return _getPopular(scene, collection, page)
};

export const getTopRated = (scene, collection, page) => {
  return _getTopRated(scene, collection, page);
};

const _getPopular = (scene, collection, page=1) => {
  const API = getCollectionAPI(scene).element(collection)[scene];
  const publicAPI = getPublicAPI(scene);
  let elements;
  return publicAPI.popular({page})
    .then(response => {
      elements = {
        key: { name: 'Popular', pk: 1 },
        type: 'popular',
        content: response,
        link: false
      };
      return prepareStreamResults(scene, collection, elements, getPopularOriginal);
    });
};

const _getTopRated = (scene, collection, page=1) => {
  const API = getCollectionAPI(scene).element(collection)[scene];
  const publicAPI = getPublicAPI(scene);
  let elements;
  return publicAPI.topRated({page})
    .then(response => {
      elements = {
        key: { name: 'Top rated', pk: 2 },
        type: 'top_rated',
        content: response,
        link: false
      };
      return prepareStreamResults(scene, collection, elements, getTopRatedOriginal);
    });
};

const prepareStreamResults = (scene, collection, elements, nextAction) => {
  
  return checkExistence(scene, collection, elements.content).then(response => {
  
    let next = null;
    if(elements.content.page < elements.content.total_pages) {
      next = nextAction.bind(this, scene, collection, elements.content.page+1);
    }
    return {
      ...elements,
      content: response.results,
      next
    };
  });
};

const prepareSearchResults = (scene, collection, elements, query) => {
  return checkExistence(scene, collection, elements).then(response => {
    let next = null;
    if(elements.page < elements.total_pages) {
      next = searchOriginal.bind(this, scene, collection, query, elements.page+1);
    }
    return {
      ...response,
      next
    };
  });
  
};

const checkExistence = (scene, collection, elements) => {
  
  const filterById = (movie, el) => {
    return movie.id === el.tmdbId;
  };
  
  const IDs = elements.results.map(el => el.id);
  let existOnServer;
  return getElementAPI(scene).serialize(IDs, 'tmdbId')
    .then(response => {
      existOnServer = response;
      return getCollectionAPI(scene).element(collection)[scene].exist(IDs, 'tmdbId');
    })
    .then(existInCollection => {
      for(let i = 0; i < elements.results.length; i++) {
        elements.results = elements.results.map(el => {
          const match = existOnServer.filter(filterById.bind(this, el));
          el.local = (match.length > 0) ? match[0] : undefined;
  
          el.already_in_collection = existInCollection[el.id];
          el.current_collection = collection;
          
          return el;
        });
      }
      return elements;
    })
};

const getSearchKey = scene => {
  switch(scene) {
    case 'movies':
      return 'movies';
    case 'tv_shows':
      return 'tvShow';
    default:
      return null;
  }
};