import { getElementAPI, getCollectionAPI, getPublicAPI } from 'services/actions/collections';

import searchAPI from 'services/TheMovieDatabaseJS/search';
import { getPopular as getPopularOriginal, getTopRated as getTopRatedOriginal } from './index';

export const search = (scene, collection, query) => {

  const searchKey = getSearchKey(scene);
  
  const filterById = (movie, el) => {
    return movie.id === el.tmdbId;
  };
  
  let elements, IDs;
  return searchAPI[searchKey](query)
    .then(response => {
      elements = response;
      IDs = elements.results.map(el => el.id);
      if(IDs.length === 0) {
        throw new Error('No result for this search');
      }
      return getElementAPI(scene).serialize(IDs, 'tmdbId');
    })
    .then(existOnServer => {
      for(let i = 0; i < elements.results.length; i++) {
        const match = existOnServer.filter(filterById.bind(this, elements.results[i]));
        elements.results[i].local = (match.length > 0) ? match[0] : undefined;
      }
      return getCollectionAPI(scene).element(collection)[scene].exist(IDs, 'tmdbId');
    })
    .catch(error => {
      return [];
    })
    .then(existInCollection => {
      return cleanResults(elements, collection, existInCollection);
    })
    .catch(error => {
      return [];
    })
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
  console.log('GET POPULAR ' + page);
  const API = getCollectionAPI(scene).element(collection)[scene];
  const publicAPI = getPublicAPI(scene);
  let elements;
  return publicAPI.popular({page})
    .then(response => {
      elements = {
        key: { name: 'Popular', pk: 1 },
        content: response,
        link: false
      };
      const IDs = response.results.map(el => el.id);
      return API.exist(IDs, 'tmdbId');
    })
    .then(exist => {
      return prepareResults(scene, collection, elements, exist, getPopularOriginal);
    });
};

const _getTopRated = (scene, collection, page=1) => {
  console.log('GET TOP RATED ' + page);
  const API = getCollectionAPI(scene).element(collection)[scene];
  const publicAPI = getPublicAPI(scene);
  let elements;
  return publicAPI.topRated({page})
    .then(response => {
      elements = {
        key: { name: 'Top rated', pk: 2 },
        content: response,
        link: false
      };
      const IDs = response.results.map(el => el.id);
      return API.exist(IDs, 'tmdbId');
    })
    .then(exist => {
      return prepareResults(scene, collection, elements, exist, getTopRatedOriginal);
    });
};

const prepareResults = (scene, collection, elements, existInCollection, nextAction) => {
  
  const content = cleanResults(elements.content, collection, existInCollection).results;
  
  let next = null;
  if(elements.content.page < elements.content.total_pages) {
    next = nextAction.bind(this, scene, collection, ++elements.content.page);
  }
  return {
    ...elements,
    content,
    next
  };
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

const cleanResults = (elements, collection, exist) => {
  for(let i = 0; i < elements.results.length; i++) {
    elements.results[i].already_in_collection = exist[elements.results[i].id];
    elements.results[i].current_collection = collection;
  }
  return elements;
};