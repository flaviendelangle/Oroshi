import { HELP as config } from 'appConfig';
import { getDetails, cleanDetails } from 'services/actions/publicAPI';
import { element } from 'services/titles/help';
import { getModule } from "services/actions/collections";

export const getElement = (scene, collection) => {
  const publicId = config.defaultElements[scene];
  const Element = getModule(scene).elementClass;
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