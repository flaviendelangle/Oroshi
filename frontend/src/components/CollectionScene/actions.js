import { source } from 'services/titles/interface'



export const switchAddingMode = scene => {
  return {
    type: source.updateIsAdding,
    meta: {
      scene
    }
  }
};