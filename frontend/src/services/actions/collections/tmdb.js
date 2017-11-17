import { getCollectionAPI, getElementAPI } from './index';
import { getDetails, cleanDetails } from 'services/actions/publicAPI';

export const addElement = (scene, data) => {
  
  let promise;
  if(data.local) {
    promise = Promise.resolve({
      data: data.local,
      collection: data.current_collection
    });
  } else {
    promise = getDetails(scene, data.current_collection, data.id, data.original_language)
      .then(details => {
        console.log(details);
        details = cleanDetails(scene, details);
        return getElementAPI(scene).create(details);
      })
      .then(response => {
        return {
          data: response,
          collection: data.current_collection
        }
      });
  }
  const localAPI = getCollectionAPI(scene);
  return promise
    .then(response => {
      data = {
        pk: response.data.pk,
        seen: data.seen
      };
      return localAPI.element(response.collection.pk)[scene].create(data);
    })
    .then(response => {
      return {
        ...response,
        seen: data.seen
      }
    })
};



