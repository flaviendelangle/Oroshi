import React, { Component } from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

import Grade from 'components/generics/Grade';

import './style.css'


class ElementOverlay extends Component {
  
  render() {
    if(!this.props.mouseOver && false) {
      return null;
    }
    return (
      <div className="element-overlay">
        <Grade
          className="grade"
          value={this.props.note}
          mouseOver={this.props.mouseOver}
        />
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
  if(creation_mode && !already_in_collection) {
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

export default muiThemeable()(ElementOverlay);