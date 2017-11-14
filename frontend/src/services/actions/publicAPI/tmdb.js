import { getElementAPI, getCollectionAPI, getPublicAPI } from 'services/actions/collections';

import searchAPI from 'services/TheMovieDatabaseJS/search';

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
  
  const _cleanResults = (elements, collection, existInCollection) => {
    elements.content = cleanResults(
      elements.content,
      collection,
      existInCollection
    ).results;
    return elements;
  };
  
  let elements = [];
  let IDs, elementsTemp, cleanedData;
  const API = getCollectionAPI(scene).element(collection)[scene];
  const publicAPI = getPublicAPI(scene);
  return publicAPI.popular()
    .then(response => {
      elementsTemp = {
        key: { name: 'Popular', pk: 1 },
        content: response,
        link: false
      };
      IDs = response.results.map(el => el.id);
      return API.exist(IDs, 'tmdbId');
    })
    .then(exist => {
      cleanedData = _cleanResults(elementsTemp, collection, exist);
      elements.push(cleanedData);
      return publicAPI.topRated();
    })
    .then(response => {
      elementsTemp = {
        key: { name: 'Top rated', pk: 2 },
        content: response,
        link: false
      };
      IDs = response.results.map(el => el.id);
      return API.exist(IDs, 'tmdbId');
    })
    .then(exist => {
      cleanedData = _cleanResults(elementsTemp, collection, exist);
      elements.push(cleanedData);
      return {
        results: elements,
      };
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

const cleanResults = (elements, collection, exist) => {
  for(let i = 0; i < elements.results.length; i++) {
    elements.results[i].already_in_collection = exist[elements.results[i].id];
    elements.results[i].current_collection = collection;
  }
  return elements;
};