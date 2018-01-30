import React from 'react';
import PropTypes from 'prop-types';

import './style.css'


const ElementLine = ({ children }) => (
  <div className="element-line">
    {children}
  </div>
);

ElementLine.propTypes = {
  children: PropTypes.node,
};

export const groupByLine = (elements, lineDimensions) => {
  if (elements.length === 0) {
    return [];
  }
  const lines = [[]];
  elements.forEach((el) => {
    if (lines[lines.length - 1].length === lineDimensions.elementsPerLine) {
      lines.push([]);
    }
    lines[lines.length - 1].push(el);
  });
  return lines;
};

export default ElementLine;
