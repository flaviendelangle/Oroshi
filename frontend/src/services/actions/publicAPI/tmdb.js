import searchAPI from 'services/TheMovieDatabaseJS/search';
import { getActions, getCollectionAPI, getElementAPI, getPublicAPI } from 'services/content/collectionTypes';
import { getPopular as getPopularOriginal, getTopRated as getTopRatedOriginal, search as searchOriginal } from './index';
import { getTmdbLanguages, DEFAULT_LANGUAGE } from 'services/languages';

export const search = (type, collection, query, page) => {
  const searchKey = getSearchKey(type);
  return searchAPI[searchKey](query, { page })
    .then((elements) => {
      return prepareSearchResults(type, collection, elements, query)
    })
    .catch((error) => {
      return {page: 1, total_results: 0, total_pages: 0, results: [] }
    });
};

export const getRecommendations = (type, collection) => {

  let elements = [];

  return _getPopular(type, collection)
    .then((results) => {
      elements.push(results);
      return _getTopRated(type, collection)
    })
    .then((results) => {
      elements.push(results);
      return {
        results: elements
      };
    });
};

export const getSuggestions = (type, collection, element, promises=[]) => {
  const results = Promise.all([
    _getElementRecommendations(type, collection, element),
    ...promises,
  ]);
  return results.then((results) => ({ results }));
};

export const getPopular = (type, collection, page) => {
  return _getPopular(type, collection, page)
};

export const getTopRated = (type, collection, page) => {
  return _getTopRated(type, collection, page);
};

export const checkExistence = (type, collection, elements, fromLocalAPI=false) => {

  if (fromLocalAPI) {
    elements.results = elements.results.map((el) => {
      return {
        ...el,
        id: el.tmdbId
      };
    });
  }

  const clean = (distant) => {
    const local = existOnServer.find((el) => el.tmdbId === distant.id);
    const in_collection = existInCollection[distant.id];
    return {
      distant,
      local,
      in_collection
    }
  };

  const IDs = elements.results.map((el) => el.id);
  let existOnServer, existInCollection;

  return getElementAPI(type).serialize(IDs, 'tmdbId')
    .then((response) => {
      existOnServer = response;
      return getCollectionAPI(type).element(collection.pk)[type].exist(IDs, 'tmdbId');
    })
    .then((response) => {
      existInCollection = response;
      elements.results = elements.results.map(clean);
      return elements;
    })
};

export const getDetails = (type, collection, tmdbId) => {

  let options = {
    append_to_response: ['credits'],
    language: DEFAULT_LANGUAGE
  };

  let details = {
    posters: [],
    titles: []
  };

  const key = (type === 'movies') ? 'title' : 'name';

  return getPublicAPI(type).details(tmdbId, options)
    .then((response) => {
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
      return getMissingData(type, tmdbId, collection, details)
    });

};

export const getPoster = (type, tmdbId, language) => {
  const options = {
    language
  };
  return getPublicAPI(type).details(tmdbId, options)
    .then((response) => {
        return response.poster_path;
    });
};

export const getTitle = (type, tmdbId, language) => {
  const options = {
    language
  };
  const key = (type === 'movies') ? 'title' : 'name';
  return getPublicAPI(type).details(tmdbId, options)
    .then((response) => response[key]);
};

const getMissingData = (type, tmdbId, collection, details) => {

  const languages = getTmdbLanguages(collection, details.original_language);
  let promise =  Promise.resolve();

  if (languages.title !== DEFAULT_LANGUAGE ) {
    promise = promise
      .then(() => getTitle(type, tmdbId, languages.title))
      .then((title) => {
        details.titles.push({
          language: languages.title,
          title: title
        });
      });
  }
  if (languages.poster !== DEFAULT_LANGUAGE) {
    promise = promise
      .then(() => getPoster(type, tmdbId, languages.poster))
      .then((poster) => {
        if (poster) {
          details.posters.push({
            language: languages.poster,
            path: poster
          });
        }
      })
  }
  return promise.then(() => details);
};

const _getElementRecommendations = (type, collection, element) => {
  const publicAPI = getPublicAPI(type);
  let elements;
  return publicAPI.recommendations(element.getPublicId()).then((response) => {
    elements = {
      key: { name: 'Recommendations', pk: 1 },
      type: 'recommendations',
      content: response,
      link: false
    };
    return prepareStreamResults(type, collection, elements, null)
  });
};

const _getPopular = (type, collection, page=1) => {
  const publicAPI = getPublicAPI(type);
  let elements;
  return publicAPI.popular({page})
    .then((response) => {
      elements = {
        key: { name: 'Popular', pk: 1 },
        type: 'popular',
        content: response,
        link: false
      };
      return prepareStreamResults(type, collection, elements, getPopularOriginal);
    });
};

const _getTopRated = (type, collection, page=1) => {
  const publicAPI = getPublicAPI(type);
  let elements;
  return publicAPI.topRated({page})
    .then((response) => {
      elements = {
        key: { name: 'Top rated', pk: 2 },
        type: 'top_rated',
        content: response,
        link: false
      };
      return prepareStreamResults(type, collection, elements, getTopRatedOriginal);
    });
};

export const prepareStreamResults = (type, collection, elements, nextAction) => {

  return checkExistence(type, collection, elements.content).then((response) => {
    const Element = getActions(type).elementClass;
    let next = null;
    if (elements.content.page < elements.content.total_pages) {
      next = nextAction.bind(this, type, collection, elements.content.page+1);
    }
    return {
      ...elements,
      content: Element.fromDistantList(response.results, collection),
      next
    };
  });
};

export const prepareSearchResults = (type, collection, { content, ...elements }, query) => {

  return checkExistence(type, collection, { content, ...elements}).then((response) => {
    const Element = getActions(type).elementClass;
    let next = null;
    if (elements.page < elements.total_pages) {
      next = searchOriginal.bind(this, type, collection, query, elements.page+1);
    }
    return {
      ...elements,
      results: Element.fromDistantList(response.results, collection),
      next
    };
  });

};

const getSearchKey = (type) => {
  switch (type) {
    case 'movies':
      return 'movies';
    case 'tv_shows':
      return 'tvShow';
    default:
      return null;
  }
};