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
};

export const getRecommendations = (scene, collection) => {
  let elements = [];
  const API = getPublicAPI(scene);
  return API.popular()
    .then(response => {
      elements.push({
        key: { name: 'Popular', pk: 1 },
        content: response.results,
        link: false
      });
      return API.topRated()
    })
    .then(response => {
      elements.push({
        key: { name: 'Top rated', pk: 2 },
        content: cleanResults(response, collection).results,
        link: false
      });
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
  }
};

const cleanResults = (elements, collection) => {
  for(let i = 0; i < elements.results.length; i++) {
    elements.results[i].current_collection = collection;
  }
  return elements;
};