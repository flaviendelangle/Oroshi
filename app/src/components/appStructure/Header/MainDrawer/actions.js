import { drawers } from '../../../../services/titles/interface'

// eslint-disable-next-line import/prefer-default-export
export const showMainDrawer = (type, collection, show) => ({
  type: drawers.main,
  show,
  meta: {
    type,
    collection,
  },
})
