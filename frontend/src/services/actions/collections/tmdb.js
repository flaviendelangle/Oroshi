import { getCollectionAPI, getElementAPI } from './index';
import { getDetails, cleanDetails, getTitle, getPoster } from 'services/actions/publicAPI';
import { getMissingLanguages } from 'services/languages';

export const addElement = (scene, collection, element) => {
  let promise;
  let details;
  let seen = element.hasBeenSeen();
  console.log(element);
  if (element.hasLocal()) {
    promise = Promise.resolve({
      collection,
      local: element.getLocal(),
    });
  } else {
    promise = getDetails(scene, false, collection, element.getPublicId())
      .then(response => {
        details = response;
        const cleanedDetails = cleanDetails(scene, details);
        return getElementAPI(scene).create(cleanedDetails);
      })
      .then(local => {
        element.setLocal(local);
        return {
          collection,
          local
        }
      });
  }
  
  const localAPI = getCollectionAPI(scene);
  return promise
    .then(response => createMissingData(scene, response))
    .then(() => {
      const data = {
        pk: element.getID(),
        seen
      };
      return localAPI.element(collection.pk)[scene].create(data);
    })
    .then(newLocal => {
      element.setLocal(newLocal);
      element.setInCollection(true);
      return element;
    })
};

const createMissingData = (scene, { collection, local }) => {
  
  if (!local) {
    return Promise.resolve();
  }
  
  const languages = getMissingLanguages(collection, local);
  const localAPI = getElementAPI(scene);

  const createTitle = i => {
    if (i < languages.title.length) {
      return getTitle(scene, local.tmdbId, languages.title[i])
        .then(title => {
          return localAPI.addTitle(local.pk, languages.title[i], title);
        })
        .then(titles => {
          return createTitle(i+1);
        })
    } else {
      return Promise.resolve({});
    }
  };
  
  const createPoster = i => {
    if (i < languages.poster.length) {
      return getPoster(scene, local.tmdbId, languages.poster[i])
        .then(poster => {
          poster = poster || '';
          return localAPI.addPoster(local.pk, languages.poster[i], poster);
        })
        .then(poster => {
          return createPoster(i+1);
        })
    } else {
      return Promise.resolve();
    }
  };
  
  return createTitle(0).then(res => createPoster(0));
  
};



