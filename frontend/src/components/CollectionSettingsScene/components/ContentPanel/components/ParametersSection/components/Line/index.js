import React, { Component } from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable';
import { ListItem } from 'material-ui/List';


class Line extends Component {
  
  render() {
    return (
      <ListItem {...this.props.params} />
    );
  }
}

export default muiThemeable()(Line);