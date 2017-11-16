import { update as _update } from 'services/actions/collections'

export const update = (scene, pk, field, value) => {
  const data = {
    [field]: value
  };
  return _update(scene, pk, data);
};