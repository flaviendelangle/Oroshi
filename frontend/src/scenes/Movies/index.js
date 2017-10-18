import React, { Component } from 'react'
import { connect } from 'react-redux'

import DialogAddMovie from './components/DialogAddMovie'
import MoviesTable from './components/MoviesTable'
import Menu from './components/Menu'

import { listMovies } from './actions'

class Movies extends Component {
  
  componentDidMount() {
    this.props.synchronize(this.props.match.params.collection_id);
  }
  
  render() {
    return (
      <div>
        <MoviesTable/>
        <DialogAddMovie collection={this.props.match.params.collection_id}/>
        <Menu/>
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
    synchronize: (collection) => {
      dispatch(listMovies(collection));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Movies);