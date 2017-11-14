import React, { Component } from 'react'
import ReactList from 'react-list';
import ScrollArea from 'react-scrollbar'

import './style.css'

class Grid extends Component {
  
  state = {
    useReactList: false
  };
  
  renderItem = (index, key) => {
    const Element = this.props.elementComponent;
    return (
      <Element
        data={this.props.data.results[index]}
        collection={this.props.collection}
        key={key}
        creationMode={this.props.creationMode}
      />
    );
  };
  
  renderItems = () => {
    if(this.state.useReactList) {
      return (
        <ReactList
          itemRenderer={this.renderItem}
          length={this.props.data.results.length}
          type='uniform'
        />
      );
    } else {
     return this.props.data.results.map(el => {
       const id = el.tmdbId || el.id;
       return this.renderItem(this.props.data.results.indexOf(el), id);
     });
    }
  };
  
  render() {
    return (
      <div className="content-grid-container">
        <ScrollArea
          speed={0.8}
          horizontal={false}
        >
          <div className="content-grid" style={{paddingBottom:400 }}>
            {this.renderItems()}
          </div>
        </ScrollArea>
      </div>
    );
  }
  
}

export default Grid;