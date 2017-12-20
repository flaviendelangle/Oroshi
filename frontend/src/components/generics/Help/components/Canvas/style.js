const ELEMENT_HEIGHT = 380;
const ELEMENT_WIDTH = 185;
const CANVAS_TO_ELEMENT_MARGIN = 300;
const CANVAS_WIDTH = ELEMENT_WIDTH + CANVAS_TO_ELEMENT_MARGIN;

export const element = {
  margin: 'auto',
  display: 'block'
};

export const canvas = {
  height: ELEMENT_HEIGHT,
  width: CANVAS_WIDTH,
  position: 'absolute',
  top: 0,
  left: 0
};

export const container = {
  height: ELEMENT_HEIGHT,
  width: CANVAS_WIDTH,
  margin: 'auto',
  position: 'relative'
};