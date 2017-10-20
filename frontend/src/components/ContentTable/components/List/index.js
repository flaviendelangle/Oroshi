import React, { Component } from 'react'

class List extends Component {
  
  renderElements = () => {
    let i=0;
    return this.props.data.map(el => {
      return (
        <span key={el[this.props.keys.key]}>
          {i++ === 0 ? '' : ', '}
          {el[this.props.keys.data]}
        </span>);
    })
  };
  
  render() {
    return (
      <div>{this.renderElements()}</div>
    );
  }
  
}

export default List
