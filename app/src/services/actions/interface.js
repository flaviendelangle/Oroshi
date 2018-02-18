import * as titles from 'services/titles/interface';

import { getLineDimensions } from 'services/interface';


export const alertScreenResize = () => ({
  type: titles.screen.resize,
  width: window.innerWidth,
  height: window.innerHeight,
  lineDimensions: getLineDimensions(window.innerWidth),
});

export const removeSnack = (type, collection) => ({
  type: titles.snacks.remove,
  meta: {
    type,
    collection,
  },
});

export const cleanElementSuggestions = (type, collection) => ({
  type: titles.elementSuggestions.clean,
  meta: {
    type,
    collection,
  }
})