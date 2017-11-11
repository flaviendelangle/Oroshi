import { _updateElementInCollection } from 'services/actions/api'

export const update = (scene, data) => {
  const clearedData = {
      seen: !data.seen
  };
  return _updateElementInCollection(scene, data.collection, data.pk, clearedData);
};