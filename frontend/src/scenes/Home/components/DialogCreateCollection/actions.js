import { createCollection as createCollectionOriginal } from '../../actions'

import { dialogs } from '../../../../services/actions/titles/interface'

export const showDialogCreateCollection = show => {
  return {
    type: dialogs.createCollection,
    show
  };
};

export const createCollection = data => {
  return createCollectionOriginal(data);
};