import { CollectionsAPI } from '../../../../services/api/collections'

export const showDialogCreateCollection = show => {
  return {
    type: 'SHOW_DIALOG_CREATE_COLLECTION',
    show
  };
};

export const createCollection = data => {
  return {
    type: 'CREATE_NEW_COLLECTION',
    payload: CollectionsAPI.create(data)
  }
};