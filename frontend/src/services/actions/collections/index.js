import { readAsText } from 'promise-file-reader';
import json2csv from 'json2csv';
import downloadjs from 'downloadjs';

import { getActions, getCollectionAPI } from "services/content/collectionTypes";
import { parseCSV, parseJSON } from 'services/utils';
import { pickElement } from 'services/languages';
import { CollectionsAPI } from 'services/api/collections';
import { checkExistence } from 'services/actions/publicAPI';
import * as titles from 'services/titles/api';
import { collections } from 'services/titles/exports'


/*
  ACTIONS WITH DISPATCH
 */
export const create = (type, data)  => {
  return {
    type: titles.collectionContent.create,
    payload: getCollectionAPI(type).create(data),
    meta: {
      type
    }
  };
};

export const destroy = (type, pk) => {
  return {
    type: titles.collections.destroy,
    payload: getCollectionAPI(type).destroy(pk)
  };
};

export const get = (type, pk) => {
  return {
    type: titles.collectionContent.load,
    payload: getCollectionAPI(type).retrieve(pk)
      .then(response => {
        return prepareElements(type, response);
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
      type,
      collection: { pk },
    }
  };
};

export const getAll = pk => {
  return {
    type: titles.collectionContent.loadAllSettings,
    payload: CollectionsAPI.settings(pk)
  }
};

export const getSettings = (type, pk) => {
  return {
    type: titles.collectionContent.loadSettings,
    payload: getCollectionAPI(type).settings(pk),
    meta: {
      type,
      collection: { pk }
    }
  }
};

export const getSuggestions = (type, collection, publicId) => {
  return {
    type: titles.collectionContent.loadSuggestions,
    payload: getActions(type).getSuggestions(type, collection, publicId),
    meta: {
      type,
      collection,
    }
  };
};

export const update = (type, pk, data) => {
  return {
    type: titles.collections.updateSettings,
    payload: getCollectionAPI(type).partial_update(pk, data)
  }
};

export const addElement = (type, collection, element) => {
  return {
    type: titles.collections.add,
    payload: getActions(type).addElement(type, collection, element),
    meta: {
      type,
      collection,
    }
  }
};

export const updateElement = (type, element, data, field) => {
  const collection = element.getCollection();
  const pk = element.getID();
  return {
    type: titles.collections.update,
    payload: getCollectionAPI(type).element(collection.pk)[type].partial_update(pk, data).then(res => {
      element.editLocal(data);
      return element;
    }),
    meta: {
      type,
      collection,
      field
    }
  }
};

export const removeElement = (type, collection, element) => {
  const api = getCollectionAPI(type).element(collection.pk)[type];
  return {
    type: titles.collections.remove,
    payload: api.destroy(element.getID()).then(response => {
      element.setInCollection(false);
      return element;
    }),
    meta: {
      type,
      collection,
    }
  }
};

export const importCSV = (type, file) => {
  return {
    type: titles.collectionContent.importFromFile,
    payload: readAsText(file).then(result => {
      return {
        data: parseCSV(type, result),
        format: 'csv'
      };
    }),
    meta: {
      type
    }
  }
};

export const importJSON = (type, file) => {
  return {
    type: titles.collectionContent.importFromFile,
    payload: readAsText(file).then(result => {
      return {
        data: parseJSON(type, result),
        format: 'json'
      }
    }),
    meta: {
      type
    }
  };
};

export const importElements = (type, collection, elements, dispatch) => {
  
  const _importElement = (type, elements, index, dispatch) => {
    if (elements.length <= index) {
      dispatch({
        type: titles.collectionContent.import + '_FULFILLED'
      });
      return true;
    }
    const element = elements[index];
    if (element.isInCollection()) {
      setTimeout(() => _importElement(type, elements, index + 1, dispatch));
      return dispatch({
        type: titles.collections.add,
        payload: element,
        meta: {
          type,
          collection,
        }
      });
    } else {
      addElement(type, collection, element).payload.then(el => {
        dispatch({
          type: titles.collections.add,
          payload: el,
          meta: {
            type,
            collection,
          }
        });
        _importElement(type, elements, index + 1, dispatch);
      });
    }

  };
  
  elements = {
    results: elements
  };

  return {
    type: titles.collectionContent.importElement,
    payload: checkExistence(type, collection, elements, true).then(elements => {
      
      const Element = getActions(type).elementClass;
      elements = Element.fromDistantList(elements.results, collection);
      dispatch({
        type: titles.collectionContent.import + '_STARTED',
        data: elements
      });
      _importElement(type, elements, 0, dispatch);
    }),
    meta: {
      type
    }
  }
};

export const exportCollection = (type, pk, format) => {
  switch(format) {
    case 'csv':
      return exportAsCSV(type, pk);
    case 'json':
      return exportAsJSON(type, pk);
    default:
      return null;
  }
};

const exportAsCSV = (type, pk) => {
  
  const generateComments = type => {
    return '#type,' + type + '\n';
  };
  
  return {
    type: collections.csv,
    payload: getDataToExport(type, pk).then(({ fields, content, collection }) => {
      const csv = json2csv({ data: content, fields: fields });
      const comments = generateComments(type);
      downloadjs(comments + csv, collection.title + '.csv', 'text/csv');
      return null;
    })
  }
};

const exportAsJSON = (type, pk) => {
  
  return {
    type: collections.json,
    payload: getDataToExport(type, pk).then(({ fields, content, collection}) => {
      const comments = {
        type
      };
      const json = JSON.stringify({
        comments,
        content
      });
      downloadjs(json, collection.title + '.json', 'text/json');
    })
  };
  
};

const getDataToExport = (type, pk) => {
  return get(type, pk).payload.then(collection => {
    const fields = getActions(type).exportFields;
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
export const addSeenToElements =  (type, elements, seen) => {
  return getActions(type).addSeenToElements(elements, seen);
};

export const addCollectionToElement = (element, collection) => {
  return {
    ...element,
    collection
  };
};

export const prepareElements = (type, data) => {
  let { content, seen, ...clearedData } = data;
  const Element = getActions(type).elementClass;
  const elements = content
    .map(el => new Element(el));
  elements.forEach(el => {
    el.setCollection(clearedData);
    getActions(type).prepareElement(el, seen);
  });

  return {
    ...data,
    content: elements
  };
};

