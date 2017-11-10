import { createCollection as _createCollection } from '../../actions'

import { dialogs } from 'services/titles/interface'

export const showDialogCreateCollection = show => {
  return {
    type: dialogs.createCollection,
    show
  };
};

export const createCollection = (...args) => {
  return _createCollection(...args);
};

