import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import NavigationExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import muiThemeable from 'material-ui/styles/muiThemeable';

import './style.css'


class Details extends Component {
  
  get style() {
    const palette = this.props.muiTheme.palette;
    return {
      backgroundColor: palette.paperBackground,
      color: palette.paperColor
    }
  };
  
  handleShowLess = () => {
    this.props.onCollapse();
  };
  
  render() {
    if(!this.props.show) {
      return null;
    }
    return (
      <Paper
        zDepth={3}
        className="details"
        style={this.style}
      >
        <div className="expand" onClick={this.handleShowLess}>
          <NavigationExpandLess style={this.style}/>
        </div>
        <Title title={this.props.title} muiTheme={this.props.muiTheme} />
      </Paper>
    )
  }
  
}

const Title = ({ title, muiTheme }) => (
  <div className="title">{title}</div>
);


export default muiThemeable()(Details);