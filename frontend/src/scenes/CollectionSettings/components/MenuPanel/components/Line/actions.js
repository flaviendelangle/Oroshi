import { collectionSettings } from 'services/titles/interface';

export const goToSection = (type, collection, value) => {
  return {
    type: collectionSettings.switchSection,
    value,
    meta: {
      collection,
      type,
    }
  };
};