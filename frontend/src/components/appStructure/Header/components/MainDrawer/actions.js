import { drawers } from 'services/titles/interface'

export const showMainDrawer = (type, collection, show) => {
  return {
    type: drawers.main,
    show,
    meta: {
      type,
      collection
    },
  };
};