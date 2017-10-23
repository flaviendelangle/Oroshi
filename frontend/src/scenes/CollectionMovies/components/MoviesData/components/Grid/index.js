import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactList from 'react-list';
import ScrollArea from 'react-scrollbar'

import Movie from './components/Movie'

import './style.css'

class Grid extends Component {
  
  renderItem = (index, key) => {
    return (
      <Movie
        data={this.props.movies[index]}
        collection={this.props.collection}
        key={key}
      />
    );
  };
  
  render() {
    return (
      <div className="movie-grid-container">
        <ScrollArea
          speed={0.8}
          horizontal={false}
        >
          <div className="movie-grid" style={{paddingBottom:400}}>
            <ReactList
              itemRenderer={this.renderItem}
              length={this.props.movies.length}
              type='uniform'
            />
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
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid);