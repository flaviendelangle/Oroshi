import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactList from 'react-list';
import ScrollArea from 'react-scrollbar';
import IconButton from 'material-ui/IconButton';
import NavigationMoreHoriz from 'material-ui/svg-icons/navigation/more-horiz';

import * as _style from './style';
import './style.css'


const CONFIG = {
  pageLength: 20,
  useReactList: false
};

class Grid extends Component {
  
  state = {
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
  
  renderItems = () => {
    if(CONFIG.useReactList) {
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
            <ShowMore isAllShow={this.isAllShown} showMore={this.showMore} />
          </div>
        </ScrollArea>
      </div>
    );
  }
  
}

const ShowMore = ({ isAllShown, showMore }) => {
  if(isAllShown) {
    return null;
  }
  return (
    <div style={_style.showMore}>
      <IconButton
        onClick={showMore}
        style={_style.button}
        iconStyle={_style.icon}
      >
        <NavigationMoreHoriz/>
      </IconButton>
    </div>
  );
};

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
