import { createCollection as createCollectionOriginal } from '../../actions'

export const showDialogCreateCollection = show => {
  return {
    type: 'SHOW_DIALOG_CREATE_COLLECTION',
    show
  };
};

export const createCollection = data => {
  return createCollectionOriginal(data);
};