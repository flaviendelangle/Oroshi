import { drawers } from 'services/titles/interface'

export const showMainDrawer = show => {
  return {
    type: drawers.main,
    show
  };
};