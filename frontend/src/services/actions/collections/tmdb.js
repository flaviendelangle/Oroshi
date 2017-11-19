import { getCollectionAPI, getElementAPI } from './index';
import { getDetails, cleanDetails, getTitle, getPoster } from 'services/actions/publicAPI';
import { getMissingLanguages } from 'services/languages';

export const addElement = (scene, data) => {
  let promise;
  if(data.local) {
    promise = Promise.resolve({
      data: data.local,
      collection: data.current_collection,
      local: true
    });
  } else {
    promise = getDetails(scene, false, data.current_collection, data.id)
      .then(details => {
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
    .then(response => createMissingData(scene, response))
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

const createMissingData = (scene, { collection, data, local }) => {
  
  if(!local) {
    return { collection, data };
  }
  
  const languages = getMissingLanguages(collection, data);
  const localAPI = getElementAPI(scene);

  const createTitle = i => {
    if(i < languages.title.length) {
      return getTitle(scene, data.tmdbId, languages.title[i])
        .then(title => {
          return localAPI.addTitle(data.pk, languages.title[i], title);
        })
        .then(titles => {
          data.titles.push(titles);
          return createTitle(i+1);
        })
    } else {
      return Promise.resolve({});
    }
  };
  
  const createPoster = i => {
    if(i < languages.poster.length) {
      return getPoster(scene, data.tmdbId, languages.poster[i])
        .then(poster => {
          poster = poster || '';
          return localAPI.addPoster(data.pk, languages.poster[i], poster);
        })
        .then(poster => {
          data.posters.push(poster);
          return createPoster(i+1);
        })
    } else {
      return Promise.resolve({ collection, data });
    }
  };
  
  return createTitle(0).then(res => createPoster(0));
  
};



