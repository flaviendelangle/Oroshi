import { dialogs } from '../../../services/titles/interface'


// eslint-disable-next-line import/prefer-default-export
export const showDialogCreateCollection = show => ({
  type: dialogs.createCollection,
  show,
})
