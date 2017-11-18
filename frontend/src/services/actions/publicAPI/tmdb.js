import searchAPI from 'services/TheMovieDatabaseJS/search';
import { getCollectionAPI, getElementAPI, getPublicAPI } from 'services/actions/collections';
import { getPopular as getPopularOriginal, getTopRated as getTopRatedOriginal, search as searchOriginal } from './index';
import { getTmdbLanguages, DEFAULT_LANGUAGE } from 'services/languages';

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

export const checkExistence = (scene, collection, elements, fromLocalAPI=false) => {
  if(fromLocalAPI) {
    elements.results = elements.results.map(el => {
      return {
        ...el,
        id: el.tmdbId
      };
    });
  }
  
  const filterById = (movie, el) => {
    return movie.id === el.tmdbId;
  };
  
  const clean = el => {
    const match = existOnServer.filter(filterById.bind(this, el));
    el.local = (match.length > 0) ? match[0] : undefined;
    
    el.already_in_collection = existInCollection[el.id];
    el.current_collection = collection;
    
    return el;
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
      for(let i = 0; i < elements.results.length; i++) {
        elements.results = elements.results.map(clean);
      }
      return elements;
    })
};

export const getDetails = (scene, collection, tmdbId, original_language) => {

  let options = {
    append_to_response: ['credits', 'images'],
    language: DEFAULT_LANGUAGE
  };
  
  let details = {
    posters: [],
    titles: []
  };

  const key = (scene === 'movies') ? 'title' : 'name';

  return getPublicAPI(scene).details(tmdbId, options)
    .then(response => {
      if(response.images.posters.length > 0) {
        details.posters.push({
          language: DEFAULT_LANGUAGE,
          path: response.images.posters[0].file_path
        });
      }
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

const getMissingData = (scene, tmdbId, collection, details) => {
  
  const languages = getTmdbLanguages(collection, details.original_language);
  let promise =  Promise.resolve();
  
  if(languages.title !== DEFAULT_LANGUAGE ) {
    promise = promise
      .then(() => getTitle(scene, tmdbId, languages.title))
      .then(title => {
        details.titles.push({
          language: languages.title,
          title: title
        });
      });
  }
  if(languages.poster !== DEFAULT_LANGUAGE) {
    promise = promise
      .then(() => getPoster(scene, tmdbId, languages.poster))
      .then(poster => {
        if(poster) {
          details.posters.push({
            language: languages.poster,
            path: poster
          });
        }
      })
  }
  return promise.then(() => details);
};

export const getPoster = (scene, tmdbId, language) => {
  const options = {
    language
  };
  return getPublicAPI(scene).images(tmdbId, options)
    .then(response => {
      if(response.posters.length > 0) {
        return response.posters[0].file_path;
      }
      return null;
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