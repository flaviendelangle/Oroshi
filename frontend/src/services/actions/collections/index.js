import { readAsText } from 'promise-file-reader';
import { parseCSV } from 'services/utils';

import * as movies from './movies';
import * as tv_shows from './tv_shows';
import { CollectionsAPI } from 'services/api/collections';
import { checkExistence } from 'services/actions/publicAPI';

import * as titles from 'services/titles/api';


/*
  ACTIONS WITH DISPATCH
 */
export const create = (scene, data, elementsToImport)  => {
  
  const _import = () => {
    let collection, elements;
    return elementsToImport
      .then(response => {
        elements = response;
        return getCollectionAPI(scene).create(data)
      })
      .then(response => {
        collection = response;
        const IDs = elements.map(el => el.tmdbId);
        return getElementAPI(scene).serialize(IDs, 'tmdbId')
      })
      .then(exist => {
        for(let i = 0; i < elements.length; i++) {
          const match = exist.filter(filterById.bind(this, elements[i]));
          elements[i].local = (match.length > 0) ? match[0] : undefined;
          elements[i].current_collection = collection.pk;
          elements[i].id = parseInt(elements[i].tmdbId, 10);
          elements[i].release = parseInt(elements[i].release, 10);
        }
        return {
          importContent: true,
          elements,
          collection,
          meta: {
            scene
          }
        };
      })
  };
  
  const filterById = (element, el) => {
    return parseInt(element.tmdbId, 10) === el.tmdbId;
  };
  
  let promise;
  if(elementsToImport) {
    promise = _import()
  }
  else {
    promise = getCollectionAPI(scene).create(data).then(collection => {
      return {
        importContent: false,
        collection
      };
    });
  }
  return {
    type: titles.collectionContent.create,
    payload: promise,
    meta: {
      scene
    }
  };
};

export const get = (scene, pk) => {
  return {
    type: titles.collectionContent.load,
    payload: getCollectionAPI(scene).retrieve(pk)
      .then(response => {
        return prepareElements(scene, response);
      })
      .catch(error => {
        error = error.toString();
        if(error === 'Error: Not Found') {
          return undefined;
        }
      }),
    meta: {
      scene
    }
  };
};

export const getAll = () => {
  return {
    type: titles.collectionContent.loadAllSettings,
    payload: CollectionsAPI.settings()
  }
};

export const getSettings = (scene, pk) => {
  return {
    type: titles.collectionContent.loadSettings,
    payload: getCollectionAPI(scene).settings(pk)
  }
};

export const update = (scene, pk, data) => {
  return {
    type: titles.collections.updateSettings,
    payload: getCollectionAPI(scene).partial_update(pk, data)
  }
};

export const addElement = (scene, data) => {
  if(!data.hasOwnProperty('seen')) {
    data.seen = false;
  }
  return {
    type: titles.collections.add,
    payload: getModule(scene).addElement(data),
    meta: {
      scene
    }
  }
};

export const updateElement = (scene, collection, id, data) => {
  return {
    type: titles.collections.update,
    payload: getCollectionAPI(scene).element(collection)[scene].partial_update(id, data),
    meta: {
      scene
    }
  }
};

export const removeElement = (scene, collection, id) => {
  const api = getCollectionAPI(scene).element(collection)[scene];
  return {
    type: titles.collections.remove,
    payload: api.destroy(id),
    meta: {
      scene
    }
  }
};

export const importCSV = (scene, file) => {
  return {
    type: titles.collectionContent.importFromFile,
    payload: readAsText(file).then(result => {
      return {
        data: parseCSV(result),
        format: 'csv'
      };
    }),
    meta: {
      scene
    }
  }
};

export const importElements = (scene, collection, elements, dispatch) => {
  
  const _importElement = (scene, elements, index, dispatch) => {
    if(elements.length <= index) {
      dispatch({
        type: titles.collectionContent.import + '_FULFILLED'
      });
      return true;
    }
    const element = elements[index];
    if(element.already_in_collection) {
      const result = {
        ...element.local,
        collection
      };
      dispatch({
        type: titles.collections.add,
        payload: result,
        meta: {
          scene
        }
      });
      _importElement(scene, elements, ++index, dispatch);
    }
    addElement(scene, element).payload.then(el => {
      dispatch({
        type: titles.collections.add,
        payload: el,
        meta: {
          scene
        }
      });
      _importElement(scene, elements, ++index, dispatch);
    });
  };
  
  elements = {
    results: elements
  };
  /*dispatch({
    type: titles.collectionContent.import + '_STARTED'
  });*/
  return {
    type: titles.collectionContent.importElement,
    payload: checkExistence(scene, collection, elements, 'true').then(elements => {
      _importElement(scene, elements.results, 0, dispatch);
    }),
    meta: {
      scene
    }
  }
};



export const getModule = scene => {
  switch(scene) {
    case 'movies':
      return movies;
    case 'tv_shows':
      return tv_shows;
    default:
      return null;
  }
};



/*
  ACTIONS WITHOUT DISPATCH
 */
export const addSeenToElements =  (scene, elements, seen) => {
  return getModule(scene).addSeenToElements(elements, seen);
};

export const addCollectionToElements = (scene, elements, pk) => {
  return elements.map(element => {
    return {
      ...element,
      collection: pk
    }
  });
};

export const prepareElements = (scene, data) => {
  data.content = addSeenToElements(scene, data.content, data.seen);
  data.content = addCollectionToElements(scene, data.content, data.pk);
  return data;
};


/*
  UTILS FUNCTIONS
 */
export const getCollectionAPI = scene => {
  return getModule(scene).collectionAPI;
};

export const getElementAPI = scene => {
  return getModule(scene).elementAPI;
};

export const getPublicAPI = scene => {
  return getModule(scene).publicAPI;
};