import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from './components/Header'
import DialogAddElement from 'components/DialogAddElement'
import MoviesData from './components/MoviesData'
import Menu from './components/Menu'
import Movie from 'components/Movie'

import { loadCollection } from './actions'

class CollectionMovies extends Component {
  
  componentDidMount() {
    this.props.synchronize(this.props.match.params.collection_id);
  }
  
  render() {
    return (
      <div>
        <Header type="movies"/>
        <MoviesData/>
        <DialogAddElement
          collection={this.props.match.params.collection_id}
          elementComponent={Movie}
          type="movies"
        />
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