import { readAsText } from 'promise-file-reader';
import json2csv from 'json2csv';
import downloadjs from 'downloadjs';

import { parseCSV, parseJSON } from 'services/utils';
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
export const create = (scene, data)  => {
  return {
    type: titles.collectionContent.create,
    payload: getCollectionAPI(scene).create(data),
    meta: {
      scene
    }
  };
};

export const destroy = (scene, pk) => {
  return {
    type: titles.collections.destroy,
    payload: getCollectionAPI(scene).destroy(pk)
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
        if (error === 'Error: Not Found') {
          return undefined;
        } else {
          console.error(error);
        }
      }),
    meta: {
      scene
    }
  };
};

export const getAll = pk => {
  return {
    type: titles.collectionContent.loadAllSettings,
    payload: CollectionsAPI.settings(pk)
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

export const addElement = (scene, collection, element) => {
  return {
    type: titles.collections.add,
    payload: getModule(scene).addElement(scene, collection, element),
    meta: {
      scene
    }
  }
};

export const updateElement = (scene, element, data, type) => {
  const collection = element.getCollection().pk;
  const pk = element.getID();
  return {
    type: titles.collections.update,
    payload: getCollectionAPI(scene).element(collection)[scene].partial_update(pk, data).then(res => {
      element.editLocal(data);
      return element;
    }),
    meta: {
      scene,
      type
    }
  }
};

export const removeElement = (scene, collection, element) => {
  console.log(element);
  const api = getCollectionAPI(scene).element(collection.pk)[scene];
  return {
    type: titles.collections.remove,
    payload: api.destroy(element.getID()).then(response => {
      element.setInCollection(false);
      return element;
    }),
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

export const importJSON = (scene, file) => {
  return {
    type: titles.collectionContent.importFromFile,
    payload: readAsText(file).then(result => {
      return {
        data: parseJSON(scene, result),
        format: 'json'
      }
    }),
    meta: {
      scene
    }
  };
};

export const importElements = (scene, collection, elements, dispatch) => {
  
  const _importElement = (scene, elements, index, dispatch) => {
    if (elements.length <= index) {
      dispatch({
        type: titles.collectionContent.import + '_FULFILLED'
      });
      return true;
    }
    const element = elements[index];
    if (element.isInCollection()) {
      setTimeout(_ => _importElement(scene, elements, index + 1, dispatch));
      return dispatch({
        type: titles.collections.add,
        payload: element,
        meta: {
          scene
        }
      });
    } else {
      addElement(scene, collection, element).payload.then(el => {
        dispatch({
          type: titles.collections.add,
          payload: el,
          meta: {
            scene
          }
        });
        _importElement(scene, elements, index + 1, dispatch);
      });
    }

  };
  
  elements = {
    results: elements
  };

  return {
    type: titles.collectionContent.importElement,
    payload: checkExistence(scene, collection, elements, true).then(elements => {
      
      const Element = getModule(scene).elementClass;
      elements = Element.fromDistantList(elements.results, collection);
      dispatch({
        type: titles.collectionContent.import + '_STARTED',
        data: elements
      });
      _importElement(scene, elements, 0, dispatch);
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
    case 'json':
      return exportAsJSON(scene, pk);
    default:
      return null;
  }
};

const exportAsCSV = (scene, pk) => {
  
  const generateComments = scene => {
    return '#scene,' + scene + '\n';
  };
  
  return {
    type: collections.csv,
    payload: getDataToExport(scene, pk).then(({ fields, content, collection }) => {
      const csv = json2csv({ data: content, fields: fields });
      const comments = generateComments(scene);
      downloadjs(comments + csv, collection.title + '.csv', 'text/csv');
      return null;
    })
  }
};

const exportAsJSON = (scene, pk) => {
  
  return {
    type: collections.json,
    payload: getDataToExport(scene, pk).then(({ fields, content, collection}) => {
      const comments = {
        scene
      };
      const json = JSON.stringify({
        comments,
        content
      });
      downloadjs(json, collection.title + '.json', 'text/json');
    })
  };
  
};

const getDataToExport = (scene, pk) => {
  return get(scene, pk).payload.then(collection => {
    const fields = getModule(scene).exportFields;
    const content = collection.content.map(el => {
      let data = {};
      const values = el.getLocal();
      fields.forEach(field => {
        if (field === 'title') {
          data[field] = pickElement(values, 'titles', 'title', collection.title_language);
        }
        else {
          data[field] = values[field]
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

export const prepareElements = (scene, data) => {
  let { content, seen, ...clearedData } = data;
  const Element = getModule(scene).elementClass;
  const elements = content
    .map(el => new Element(el));
  elements.forEach(el => {
    el.setCollection(clearedData);
    getModule(scene).prepareElement(el, seen);
  });

  return {
    ...data,
    content: elements
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

