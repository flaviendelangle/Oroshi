import { layout as _layout } from 'services/titles/interface'
import { sort as _sort } from 'services/titles/data'

export const switchLayout = (type, collection, newLayout) => {
  return {
    type: _layout.update,
    layout: newLayout,
    meta: {
      type,
      collection,
    },
  }
};


export const sort = (type, collection, layout, field, direction) => {
  return {
    type: _sort.update,
    parameters: { layout, field, direction },
    meta: {
      type,
      collection,
    },
  };
};
