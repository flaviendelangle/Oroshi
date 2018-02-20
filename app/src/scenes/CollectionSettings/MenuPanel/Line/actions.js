import { collectionSettings } from '../../../../services/titles/interface'


// eslint-disable-next-line import/prefer-default-export
export const goToSection = (type, collection, value) => ({
  type: collectionSettings.switchSection,
  value,
  meta: {
    collection,
    type,
  },
})
