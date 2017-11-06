import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from './components/Header'
import DialogAddMovie from './components/DialogAddMovie'
import MoviesData from './components/MoviesData'
import Menu from './components/Menu'

import { loadCollection } from './actions'

class CollectionMovies extends Component {
  
  componentDidMount() {
    this.props.synchronize(this.props.match.params.collection_id);
  }
  
  render() {
    return (
      <div>
        <Header/>
        <MoviesData/>
        <DialogAddMovie collection={this.props.match.params.collection_id}/>
        <Menu/>
      </div>
    )
  
  }
  
}

const mapStateToProps = state => {
  return {}
};

const mapDispatchToProps = dispatch => {
  return {
    synchronize: collection => dispatch(loadCollection(collection))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionMovies);