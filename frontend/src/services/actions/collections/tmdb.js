import { getModule, getCollectionAPI, getElementAPI } from './index';
import { getDetails, cleanDetails, getTitle, getPoster } from 'services/actions/publicAPI';
import { getMissingLanguages } from 'services/languages';

export const addElement = (scene, collection, element) => {
  
  let promise;
  let details;
  if (element.hasLocal()) {
    promise = Promise.resolve({
      local: element.getLocal()
    });
  } else {
    promise = getDetails(scene, false, collection, element.getPublicId())
      .then(response => {
        details = response;
        const cleanedDistant = cleanDetails(scene, response);
        return getElementAPI(scene).create(cleanedDistant);
      })
      .then(local => {
        return {
          local,
          distant: element.getDistant(),
          details
        }
      });
  }
  
  const localAPI = getCollectionAPI(scene);
  let finalData;
  
  return promise
    .then(response => createMissingData(scene, response))
    .then(finalData => {
      const data = {
        pk: finalData.local.pk,
        seen: element.hasBeenSeen()
      };
      return localAPI.element(collection.pk)[scene].create(data);
    })
    .then(response => {
      finalData.local = response;
      return getModule(scene).elementClass.fromDistant(finalData, collection);
    })
};

const createMissingData = (scene, { collection, details, local }) => {
  
  if(!local) {
    return { collection, details };
  }
  
  const languages = getMissingLanguages(collection, details);
  const localAPI = getElementAPI(scene);

  const createTitle = i => {
    if(i < languages.title.length) {
      return getTitle(scene, local.tmdbId, languages.title[i])
        .then(title => {
          return localAPI.addTitle(local.pk, languages.title[i], title);
        })
        .then(titles => {
          details.titles.push(titles);
          return createTitle(i+1);
        })
    } else {
      return Promise.resolve({});
    }
  };
  
  const createPoster = i => {
    if(i < languages.poster.length) {
      return getPoster(scene, local.tmdbId, languages.poster[i])
        .then(poster => {
          poster = poster || '';
          return localAPI.addPoster(local.pk, languages.poster[i], poster);
        })
        .then(poster => {
          details.posters.push(poster);
          return createPoster(i+1);
        })
    } else {
      return Promise.resolve({ collection, details, local });
    }
  };
  
  return createTitle(0).then(res => createPoster(0));
  
};



