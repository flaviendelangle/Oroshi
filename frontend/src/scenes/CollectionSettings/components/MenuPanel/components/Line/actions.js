import { collectionSettings } from 'services/titles/interface';

export const goToSection = (scene, collection, value) => {
  return {
    type: collectionSettings.switchSection,
    value,
    meta: {
      collection,
      scene,
    }
  };
};