import { dialogs } from 'services/titles/interface'

export const showDialogCreateCollection = (show) => {
  return {
    type: dialogs.createCollection,
    show
  };
};
