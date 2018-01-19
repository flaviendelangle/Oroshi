import * as titles from 'services/titles/interface';

import { getLineDimensions } from 'services/interface';

export const alertScreenResize = _ => {
  return {
    type: titles.screen.resize,
    width: window.innerWidth,
    height: window.innerHeight,
    lineDimensions: getLineDimensions(window.innerWidth)
  }
};

export const removeSnack = (type, collection) => {
  return {
    type: titles.snacks.remove,
    meta: {
      type,
      collection,
    }
  };
};