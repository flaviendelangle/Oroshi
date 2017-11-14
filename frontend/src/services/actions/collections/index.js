import * as movies from './movies';
import * as tv_shows from './tv_shows';

import * as titles from 'services/titles/api'

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
        return response;
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
  }
};

export const getSettings = (scene, pk) => {
  return {
    type: titles.collectionContent.loadSettings,
    payload: getCollectionAPI(scene).settings(pk)
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