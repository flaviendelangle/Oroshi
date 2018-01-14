import { HELP as config } from 'appConfig';
import { getDetails, cleanDetails } from 'services/actions/publicAPI';
import { element } from 'services/titles/help';
import { getActions } from "services/content/collectionTypes";

export const getElement = (type, collection) => {
  const publicId = config.defaultElements[type];
  const Element = getActions(type).elementClass;
  return {
    type: element.loaded,
    payload: getDetails(type, false, collection, publicId).then(response => {
      const data = {
        local: cleanDetails(type, response)
      };
      return Element.fromDistant(data, collection);
    })
  };
};