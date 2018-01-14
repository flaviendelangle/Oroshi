import { source } from 'services/titles/interface'

export const switchAddingMode = (type, collection) => {
  return {
    type: source.updateIsAdding,
    meta: {
      type,
      collection,
    }
  }
};