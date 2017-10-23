import React, { Component } from 'react'
import { connect } from 'react-redux'

import Poster from './components/Poster'
import Details from './components/Details'
import Title from './components/Title'
import Recommendations from './components/Recommendations'
import { loadMovie } from './actions'

const parentStyle = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  textAlign: 'center'
};

const containerStyle = {
  width: '90%',
  maxWidth: 1200,
  maxHeight: 'calc(100% - 200px)',
  position: 'relative',
  margin: '100px auto 0 auto',
  textAlign: 'left',
};

const rightContainerStyle = {
  display: 'inline-block',
  verticalAlign: 'top',
  marginLeft: 30,
  width: 'calc(100% - 215px)',
  height: '100%'
};

class Movie extends Component {
  
  componentDidMount() {
    this.props.synchronize(this.props.match.params.movie_id);
  }
  
  render() {
    return (
      <div style={parentStyle}>
        <div style={containerStyle}>
          <Poster/>
          <div style={rightContainerStyle}>
            <Title/>
            <Details/>
          </div>
        </div>
        <Recommendations/>
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