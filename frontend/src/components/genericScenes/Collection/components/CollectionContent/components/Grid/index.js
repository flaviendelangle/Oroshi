import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactList from 'react-list';
import ScrollArea from 'react-scrollbar';
import IconButton from 'material-ui/IconButton';
import NavigationMoreHoriz from 'material-ui/svg-icons/navigation/more-horiz';

import './style.css'

const CONFIG = {
  pageLength: 20
};

const buttonStyle = {
  width: 96,
  height: 96,
  padding: 24,
};

const iconStyle = {
  width: 48,
  height: 48
};

class Grid extends Component {
  
  state = {
    useReactList: false,
    pages: 1
  };
  
  get elements() {
    let elements = this.props.data.results;
    if(elements.length > CONFIG.pageLength * this.state.pages) {
      elements = elements.slice(0,CONFIG.pageLength * this.state.pages);
    }
    return elements;
  }
  
  get isAllShown() {
    const local = this.props.data.results.length <= CONFIG.pageLength * this.state.pages;
    return local && !this.props.data.next;
  }
  
  showMore = () => {
    if(this.props.data.next) {
      this.props.loadMore(this.props.data.next);
    }
    this.setState({pages: (++this.state.pages)});
  };
  
  renderItem = (index, key) => {
    const Element = this.props.elementComponent;
    return (
      <Element
        data={this.props.data.results[index]}
        collection={this.props.collection}
        key={key}
        creationMode={this.props.creationMode}
        onCreate={this.props.onCreate}
      />
    );
  };
  
  renderShowMore = () => {
    if(this.isAllShown) {
      return null;
    }
    return (
      <div style={{textAlign: 'center'}}>
        <IconButton
          onClick={this.showMore}
          style={buttonStyle}
          iconStyle={iconStyle}
        >
          <NavigationMoreHoriz/>
        </IconButton>
      </div>
    );
  };
  
  renderItems = () => {
    if(this.state.useReactList) {
      return (
        <ReactList
          itemRenderer={this.renderItem}
          length={this.elements.length}
          type='uniform'
        />
      );
    } else {
     return this.elements.map(el => {
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
            {this.renderShowMore()}
          </div>
        </ScrollArea>
      </div>
    );
  }
  
}

const mapStateToProps = state => {
  return {}
};

const mapDispatchToProps = dispatch => {
  return {
    loadMore: loadFunction => dispatch(loadFunction())
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid);
