import { collectionCreation } from '../../../../../../services/actions/titles/interface'

export const updateIdenticon = string => {
  return {
    type: collectionCreation.updateIdenticon,
    string
  };
};