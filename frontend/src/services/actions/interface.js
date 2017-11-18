import { screen } from 'services/titles/interface';

import { getLineDimensions } from 'services/interface';

export const alertScreenResize = () => {
  return {
    type: screen.resize,
    width: window.innerWidth,
    height: window.innerHeight,
    lineDimensions: getLineDimensions(window.innerWidth)
  }
};