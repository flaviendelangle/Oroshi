import { source } from '../../services/titles/interface'


// eslint-disable-next-line import/prefer-default-export
export const switchAddingMode = (type, collection) => ({
  type: source.updateIsAdding,
  meta: {
    type,
    collection,
  },
})
