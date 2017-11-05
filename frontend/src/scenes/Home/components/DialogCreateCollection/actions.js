import { createCollection as _createCollection } from '../../actions'

import { dialogs } from '../../../../services/actions/titles/interface'

export const showDialogCreateCollection = show => {
  return {
    type: dialogs.createCollection,
    show
  };
};

export const createCollection = data => {
  return _createCollection(data);
};

export const updateMoviesToImport = ids => {
  return {
    type: dialogs.importMoviesInCollectionCreation,
    data: ids
  }
};