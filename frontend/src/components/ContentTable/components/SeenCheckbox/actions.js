import { updateElement } from 'services/actions/collections'

export const update = (scene, data) => {
  const clearedData = {
      seen: !data.seen
  };
  return updateElement(scene, data.collection, data.pk, clearedData);
};