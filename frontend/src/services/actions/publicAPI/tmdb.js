import searchAPI from 'services/TheMovieDatabaseJS/search';
import { getActions, getCollectionAPI, getElementAPI, getPublicAPI } from 'services/content/collectionTypes';
import { getPopular as getPopularOriginal, getTopRated as getTopRatedOriginal, search as searchOriginal } from './index';
import { getTmdbLanguages, DEFAULT_LANGUAGE } from 'services/languages';

export const search = (scene, collection, query, page) => {
  const searchKey = getSearchKey(scene);
  return searchAPI[searchKey](query, { page })
    .then(elements => {
      return prepareSearchResults(scene, collection, elements, query)
    })
    .catch(error => {
      console.log(error);
      return {page: 1, total_results: 0, total_pages: 0, results: [] }
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

export const getSuggestions = (scene, collection, tmdbId) => {
  const results = Promise.all([
    _getElementRecommendations(scene, collection, tmdbId)
  ]);
  return results.then(results => ({ results }));
};

export const getPopular = (scene, collection, page) => {
  return _getPopular(scene, collection, page)
};

export const getTopRated = (scene, collection, page) => {
  return _getTopRated(scene, collection, page);
};

export const checkExistence = (scene, collection, elements, fromLocalAPI=false) => {

  if (fromLocalAPI) {
    elements.results = elements.results.map(el => {
      return {
        ...el,
        id: el.tmdbId
      };
    });
  }
  
  const clean = distant => {
    const local = existOnServer.find(el => el.tmdbId === distant.id);
    const in_collection = existInCollection[distant.id];
    return {
      distant,
      local,
      in_collection
    }
  };
  
  const IDs = elements.results.map(el => el.id);
  let existOnServer, existInCollection;
  
  return getElementAPI(scene).serialize(IDs, 'tmdbId')
    .then(response => {
      existOnServer = response;
      return getCollectionAPI(scene).element(collection.pk)[scene].exist(IDs, 'tmdbId');
    })
    .then(response => {
      existInCollection = response;
      elements.results = elements.results.map(clean);
      return elements;
    })
};

export const getDetails = (scene, collection, tmdbId) => {

  let options = {
    append_to_response: ['credits'],
    language: DEFAULT_LANGUAGE
  };
  
  let details = {
    posters: [],
    titles: []
  };

  const key = (scene === 'movies') ? 'title' : 'name';

  return getPublicAPI(scene).details(tmdbId, options)
    .then(response => {
      details.posters.push({
        language: DEFAULT_LANGUAGE,
        path: response.poster_path
      });
      details.titles.push({
        language: DEFAULT_LANGUAGE,
        title: response[key]
      });
      
      details = {
        ...details,
        ...response
      };
      return getMissingData(scene, tmdbId, collection, details)
    });
  
};

export const getPoster = (scene, tmdbId, language) => {
  const options = {
    language
  };
  return getPublicAPI(scene).details(tmdbId, options)
    .then(response => {
        return response.poster_path;
    });
};

export const getTitle = (scene, tmdbId, language) => {
  const options = {
    language
  };
  const key = (scene === 'movies') ? 'title' : 'name';
  return getPublicAPI(scene).details(tmdbId, options)
    .then(response => response[key]);
};

const getMissingData = (scene, tmdbId, collection, details) => {
  
  const languages = getTmdbLanguages(collection, details.original_language);
  let promise =  Promise.resolve();
  
  if (languages.title !== DEFAULT_LANGUAGE ) {
    promise = promise
      .then(_ => getTitle(scene, tmdbId, languages.title))
      .then(title => {
        details.titles.push({
          language: languages.title,
          title: title
        });
      });
  }
  if (languages.poster !== DEFAULT_LANGUAGE) {
    promise = promise
      .then(_ => getPoster(scene, tmdbId, languages.poster))
      .then(poster => {
        if (poster) {
          details.posters.push({
            language: languages.poster,
            path: poster
          });
        }
      })
  }
  return promise.then(_ => details);
};

const _getElementRecommendations = (scene, collection, tmdbId) => {
  const publicAPI = getPublicAPI(scene);
  let elements;
  return publicAPI.recommendations(tmdbId).then(response => {
    elements = {
      key: { name: 'Recommendations', pk: 1 },
      type: 'recommendations',
      content: response,
      link: false
    };
    return prepareStreamResults(scene, collection, elements, null)
  });
};

const _getPopular = (scene, collection, page=1) => {
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
    const Element = getActions(scene).elementClass;
    let next = null;
    if (elements.content.page < elements.content.total_pages) {
      next = nextAction.bind(this, scene, collection, elements.content.page+1);
    }
    return {
      ...elements,
      content: Element.fromDistantList(response.results, collection),
      next
    };
  });
};

const prepareSearchResults = (scene, collection, { content, ...elements }, query) => {
  
  return checkExistence(scene, collection, { content, ...elements}).then(response => {
    const Element = getActions(scene).elementClass;
    let next = null;
    if (elements.page < elements.total_pages) {
      next = searchOriginal.bind(this, scene, collection, query, elements.page+1);
    }
    return {
      ...elements,
      results: Element.fromDistantList(response.results, collection),
      next
    };
  });
  
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