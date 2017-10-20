import React, { Component } from 'react'

import './style.css'

class Line extends Component {
  
  render() {
    return (
      <div className="details-line">
        {this.props.children}
      </div>
    );
    
  }
  
}

export default Line