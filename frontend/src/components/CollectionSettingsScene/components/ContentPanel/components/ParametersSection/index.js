import React, { Component } from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { List } from 'material-ui/List';

import Line from './components/Line';

const sectionStyle = {
  width: '100%',
  maxWidth: 500
};

class ParametersSection extends Component {
  
  get title() {
    return this.props.children.filter(el => {
      return el.props.className === 'title';
    })[0];
  }
  
  get content() {
    let lines = this.props.children.filter(el => {
      return el.props.className === 'content';
    })[0].props.children;
    if(lines === undefined) {
      return null;
    }
    if(!Array.isArray(lines)) {
      lines = [lines];
    }
    let i=0;
    return lines.map(el => {
      return (
        <Line
          params={el.props}
          key={++i}
        />
      );
    });
  }
  
  get titleStyle() {
    return {
      fontSize: '1.5em',
      paddingLeft: 20,
      color: this.props.muiTheme.baseTheme.palette.titleColor
    };
  }
  
  render() {
    return (
      <div style={sectionStyle}>
        <div style={this.titleStyle}>{this.title}</div>
        <List>
          {this.content}
        </List>
      </div>
    );
  }
}

export default muiThemeable()(ParametersSection);