import { prepareElements } from 'scenes/CollectionSettings/services/utils'

import { get as getCollection } from 'services/actions/collections'
import { source } from 'services/titles/interface'

export const loadCollection = (scene, pk) => {
  const results = getCollection(scene, pk);
  results.payload = results.payload.then(response => {
    return prepareElements(scene, response);
  });
  return results;
};

export const switchAddingMode = scene => {
  return {
    type: source.updateIsAdding,
    meta: {
      scene
    }
  }
};