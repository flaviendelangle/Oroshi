import { drawers } from 'services/titles/interface'

export const showMainDrawer = (type, collection, show) => ({
  type: drawers.main,
  show,
  meta: {
    type,
    collection,
  },
})
