import { update as _update } from 'services/actions/collections'


export const update = (type, pk, field, value) => {
  const data = {
    [field]: value,
  };
  return _update(type, pk, data);
};