import React, { Component } from 'react'
import ReactList from 'react-list';
import ScrollArea from 'react-scrollbar'

import './style.css'

class Grid extends Component {
  
  renderItem = (index, key) => {
    const Element = this.props.elementComponent;
    return (
      <Element
        data={this.props.data[index]}
        collection={this.props.collection}
        key={key}
        creationMode={false}
      />
    );
  };
  
  render() {
    return (
      <div className="content-grid-container">
        <ScrollArea
          speed={0.8}
          horizontal={false}
        >
          <div className="content-grid" style={{paddingBottom:400 }}>
            <ReactList
              itemRenderer={this.renderItem}
              length={this.props.data.length}
              type='uniform'
            />
          </div>
        </ScrollArea>
      </div>
    );
  }
  
}

export default Grid;