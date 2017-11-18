import React, { Component } from 'react';

import './style.css'


class ElementLine extends Component {
  
  render() {
    return (
      <div className="content-line">
        {this.props.children}
      </div>
    );
  }
  
}

export const groupByLine = (elements, lineDimensions) => {
  if(elements.length === 0) {
    return null;
  }
  let lines = [[]];
  elements.forEach(el => {
    if(lines[lines.length-1].length === lineDimensions.elementsPerLine) {
      lines.push([]);
    }
    lines[lines.length-1].push(el);
  });
  return lines;
};

export default ElementLine;
