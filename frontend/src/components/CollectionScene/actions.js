import { prepareElements } from 'scenes/CollectionSettings/services/utils'

import { _loadCollection } from 'services/actions/api'

export const loadCollection = (scene, pk) => {
  const results = _loadCollection(scene, pk);
  results.payload = results.payload.then(response => {
    return prepareElements(scene, response);
  });
  return results;
};
