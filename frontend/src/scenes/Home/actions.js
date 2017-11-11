import { getCollectionAPI, getElementAPI, CollectionsAPI } from 'services/api/collections'

import { collectionContent } from 'services/titles/api'

export const createCollection = (scene, data, elementsToImport)  => {
  let promise;
  if(elementsToImport) {
    promise = updateElementsToImport(scene, data, elementsToImport)
  } else {
    promise = getCollectionAPI(scene).create(data).then(collection => {
      return {
        importContent: false,
        collection
      };
    });
  }
  return {
    type: collectionContent.create,
    payload: promise,
    meta: {
      scene
    }
  };
};

export const loadCollections = () => {
  return {
    type: collectionContent.loadAllSettings,
    payload: CollectionsAPI.settings()
  }
};

const updateElementsToImport = (scene, data, elementsToImport) => {
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