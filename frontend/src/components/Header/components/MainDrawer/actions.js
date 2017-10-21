import { drawers } from '../../../../services/actions/titles/interface'

export const showMainDrawer = show => {
  return {
    type: drawers.main,
    show
  };
};