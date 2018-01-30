import { source } from 'services/titles/interface'

export const switchAddingMode = (type, collection) => ({
  type: source.updateIsAdding,
  meta: {
    type,
    collection,
  },
});
