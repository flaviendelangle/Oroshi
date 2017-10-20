import React, { Component } from 'react'
import { connect } from 'react-redux'

import Poster from './components/Poster'
import Details from './components/Details'
import Title from './components/Title'
import { loadMovie } from './actions'

const containerStyle = {
  width: 800,
  height: 400,
  left: 'calc(50% - 400px)',
  position: 'absolute',
  top: 100
};

const rightContainerStyle = {
  display: 'inline-block',
  marginLeft: 30
};

class Movie extends Component {
  
  componentDidMount() {
    this.props.synchronize(this.props.match.params.movie_id);
  }
  
  render() {
    return (
      <div style={containerStyle}>
        <Poster/>
        <div style={rightContainerStyle}>
          <Title/>
          <Details/>
        </div>
      </div>
    )
    
  }
  
}

const mapStateToProps = state => {
  return {
  }
};

const mapDispatchToProps = dispatch => {
  return {
    synchronize: (collection) => dispatch(loadMovie(collection))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Movie);