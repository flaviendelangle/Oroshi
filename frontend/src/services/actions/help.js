import { HELP as config } from 'appConfig';
import { getDetails, cleanDetails } from 'services/actions/publicAPI';
import { element } from 'services/titles/help';
import { getActions } from "services/content/collectionTypes";

export const getElement = (scene, collection) => {
  const publicId = config.defaultElements[scene];
  const Element = getActions(scene).elementClass;
  return {
    type: element.loaded,
    payload: getDetails(scene, false, collection, publicId).then(response => {
      const data = {
        local: cleanDetails(scene, response)
      };
      return Element.fromDistant(data, collection);
    })
  };
};