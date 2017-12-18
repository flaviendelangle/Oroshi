import React, { Component } from 'react';

import muiThemeable from 'material-ui/styles/muiThemeable';

import Grade from 'components/generics/Grade';

import './style.css'


class ElementOverlay extends Component {
  
  state = {
    show: true,
    waiting: false
  };
  
  timeout = null;
  
  componentWillUnmount() {
    clearTimeout(this.timeout)
  }
  
  componentWillReceiveProps(newProps) {
    if (newProps.mouseOver) {
      this.setState({ show: true, waiting: false });
    } else {
      this.setState({ waiting: true });
      this.timeout = setTimeout(_ => {
        if (this.state.waiting) {
          this.setState({ show: false, waiting: false });
        }
      }, 300);
    }
  }
  
  render() {
    if (!this.state.show) {
      return null;
    }
    return (
      <div className="element-overlay">
        <Grade
          className="grade"
          value={this.props.note}
          mouseOver={this.state.show}
        />
        <TopRightAction>{this.props.topRightAction}</TopRightAction>
        <Footer
          creation_mode={this.props.creation_mode}
          already_in_collection={this.props.already_in_collection}
          handleSave={this.props.handleSave}
          handleDestroy={this.props.handleDestroy}
        />
      </div>
    );
  }
  
}

const Footer = ({ creation_mode, already_in_collection, handleSave, handleDestroy }) => {
  let Content;
  if (creation_mode && !already_in_collection) {
    Content = (
      <div
        className="footer-content"
        onClick={handleSave}
        style={{background: 'rgba(76,175,80,0.8)'}}
      >
        ADD
      </div>
    );
  } else {
    Content = (
      <div
        className="footer-content"
        onClick={handleDestroy}
        style={{background: 'rgba(244,67,54,0.8)'}}
      >
        REMOVE
      </div>
    );
  }
  return <div className="footer">{Content}</div>;
};

const TopRightAction = ({ children }) => {
  return <div className="top-right-icon">{children}</div>
};

export default muiThemeable()(ElementOverlay);