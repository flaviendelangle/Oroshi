import React, { Component } from 'react'
import { connect } from 'react-redux'

import Poster from './components/Poster'
import Details from './components/Details'
import Title from './components/Title'
import { loadMovie } from './actions'

const containerStyle = {
  width: 800,
  height: 400,
  position: 'relative',
  margin: '100px auto 0 auto'
};

const rightContainerStyle = {
  display: 'inline-block',
  verticalAlign: 'top',
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