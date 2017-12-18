import React, { Component } from 'react';
import { connect } from 'react-redux';
import muiThemeable from 'material-ui/styles/muiThemeable';

import { goToSection } from './actions';

import './style.css';


class Line extends Component {
  
  get palette() {
    return this.props.muiTheme.baseTheme.palette;
  }
  
  get active() {
    return this.props.active ? 1 : 0;
  }
  
  get contentStyle() {
   return {
     color: this.palette.textColor
   };
  }
  
  render() {
    return (
      <div className="line" data-active={this.active}>
        <div
          style={this.contentStyle}
          className="line-content"
          onClick={_ => this.props.goTo(this.props.value)}
        >
          {this.props.children}
        </div>
      </div>
    );
    
  }
  
}

const mapStateToProps = state => {
  return {
  }
};

const mapDispatchToProps = dispatch => {
  return {
    goTo: value => dispatch(goToSection(value))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(muiThemeable()(Line));