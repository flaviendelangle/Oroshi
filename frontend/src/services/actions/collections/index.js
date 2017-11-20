import { readAsText } from 'promise-file-reader';
import json2csv from 'json2csv';
import downloadjs from 'downloadjs';

import { parseCSV } from 'services/utils';
import { pickElement } from 'services/languages';

import * as movies from './movies';
import * as tv_shows from './tv_shows';
import { CollectionsAPI } from 'services/api/collections';
import { checkExistence } from 'services/actions/publicAPI';

import * as titles from 'services/titles/api';
import { collections } from 'services/titles/exports'


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
          elements[i].current_collection = collection;
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
    payload: getModule(scene).addElement(scene, data),
    meta: {
      scene
    }
  }
};

export const updateElement = (scene, collection, id, data) => {
  return {
    type: titles.collections.update,
    payload: getCollectionAPI(scene).element(collection.pk)[scene].partial_update(id, data),
    meta: {
      scene
    }
  }
};

export const removeElement = (scene, collection, data) => {
  const api = getCollectionAPI(scene).element(collection.pk)[scene];
  return {
    type: titles.collections.remove,
    payload: api.destroy(data.pk),
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
        data: parseCSV(scene, result),
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
      setTimeout(() => _importElement(scene, elements, ++index, dispatch));
      return dispatch({
        type: titles.collections.add,
        payload: result,
        meta: {
          scene
        }
      });
    } else {
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
    }

  };
  
  elements = {
    results: elements
  };

  return {
    type: titles.collectionContent.importElement,
    payload: checkExistence(scene, collection, elements, 'true').then(elements => {
      dispatch({
        type: titles.collectionContent.import + '_STARTED',
        data: elements.results
      });
      _importElement(scene, elements.results, 0, dispatch);
    }),
    meta: {
      scene
    }
  }
};

export const exportCollection = (scene, pk, format) => {
  switch(format) {
    case 'csv':
      return exportAsCSV(scene, pk);
    default:
      return null;
  }
};

const exportAsCSV = (scene, pk) => {
  
  const generateComments = (scene, collection) => {
    return '#scene,' + scene + '\n';
  };
  
  return {
    type: collections.csv,
    payload: getDataToExport(scene, pk).then(({ fields, content, collection }) => {
      const csv = json2csv({ data: content, fields: fields });
      const comments = generateComments(scene, collection);
      downloadjs(comments + csv, collection.title + '.csv', 'text/csv');
      return null;
    })
  }
};

const getDataToExport = (scene, pk) => {
  return get(scene, pk).payload.then(collection => {
    const fields = getModule(scene).exportFields;
    const content = collection.content.map(el => {
      let data = {};
      fields.forEach(field => {
        if(field === 'title') {
          data[field] = pickElement(el, 'titles', 'title', collection.title_language);
        }
        else {
          data[field] = el[field]
        }
      });
      return data;
    });
    return {
      collection,
      fields,
      content
    };
  });
};


/*
  ACTIONS WITHOUT DISPATCH
 */
export const addSeenToElements =  (scene, elements, seen) => {
  return getModule(scene).addSeenToElements(elements, seen);
};

export const addCollectionToElement = (element, collection) => {
  return {
    ...element,
    collection
  };
};

export const addCollectionToElements = (elements, collection) => {
  return elements.map(element => {
    return addCollectionToElement(element, collection);
  });
};

export const prepareElements = (scene, data) => {
  let { content, seen, ...clearedData } = data;
  content = addSeenToElements(scene, content, seen);
  content = addCollectionToElements(content, clearedData);
  return {
    ...data,
    content
  };
};




/*
  UTILS FUNCTIONS
 */

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

export const getCollectionAPI = scene => {
  return getModule(scene).collectionAPI;
};

export const getElementAPI = scene => {
  return getModule(scene).elementAPI;
};

export const getPublicAPI = scene => {
  return getModule(scene).publicAPI;
};

