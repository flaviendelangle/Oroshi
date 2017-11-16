import { layout } from 'services/titles/interface'
import { sort as _sort } from 'services/titles/data'

export const switchLayout = (scene, newLayout) => {
  return {
    type: layout.update,
    layout: newLayout,
    meta: {
      scene
    }
  }
};


export const sort = (scene, type, layout, field, direction) => {
  return {
    type: _sort.update,
    parameters: {layout, field, direction},
    meta: {
      scene
    }
  };
};
