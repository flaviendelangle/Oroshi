import { dialogs } from 'services/titles/interface'

export const showDialog = show => {
  return {
    type: dialogs.addElement,
    show
  };
};
