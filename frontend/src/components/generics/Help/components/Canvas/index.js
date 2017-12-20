import React, {Component} from 'react';

import muiThemeable from 'material-ui/styles/muiThemeable';

import * as _style from './style';

class Canvas extends Component {
  
  render() {
    const { element, collection } = this.props.elementProps;
    const Element = this.props.component;
    return (
      <div style={_style.container}>
        <Element
          data={element}
          collection={collection}
          key={element.getPublicId()}
          creationMode={false}
          style={_style.element}
          mode="test"
        />
        <canvas width={_style.canvas.width} height={_style.canvas.height} style={_style.canvas}>
        </canvas>
      </div>
    );
  }
  
}
export default muiThemeable()(Canvas);
