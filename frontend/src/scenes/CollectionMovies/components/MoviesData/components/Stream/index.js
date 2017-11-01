import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactList from 'react-list';
import ScrollArea from 'react-scrollbar'

class Stream extends Component {
  
  renderItem = (index, key) => {
    return (null);
  };
  
  render() {
    return (
      <div className="movie-grid-container">
        <ScrollArea
          speed={0.8}
          horizontal={false}
        >
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
)(Stream);