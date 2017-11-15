import { collectionSettings } from 'services/titles/interface';

export const goToSection = value => {
  return {
    type: collectionSettings.switchSection,
    value
  };
};