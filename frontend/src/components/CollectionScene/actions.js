import { prepareElements } from 'scenes/CollectionSettings/services/utils'

import { get as getCollection } from 'services/actions/collections'

export const loadCollection = (scene, pk) => {
  const results = getCollection(scene, pk);
  results.payload = results.payload.then(response => {
    return prepareElements(scene, response);
  });
  return results;
};
