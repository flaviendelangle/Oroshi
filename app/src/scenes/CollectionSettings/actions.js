import { update as _update } from '../../services/actions/collections'


// eslint-disable-next-line import/prefer-default-export
export const update = (type, pk, field, value) => {
  const data = {
    [field]: value,
  }
  return _update(type, pk, data)
}
