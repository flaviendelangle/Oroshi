import React, { Component } from 'react'
import { connect } from 'react-redux'

import DialogAddMovie from './components/DialogAddMovie'
import MoviesTable from './components/MoviesTable'
import Menu from './components/Menu'

import { listMovies } from './actions'
import { showDialogAddMovie } from './components/DialogAddMovie/actions'

class Movies extends Component {
  
  constructor({ closeModal, synchronize }) {
    super();
    this.closeModal = closeModal;
    this.synchronize = synchronize;
    this.synchronize();
    
  }
  
  render() {
    return (
      <div>
        <MoviesTable/>
        <DialogAddMovie/>
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
    closeModal: () => {
      dispatch(showDialogAddMovie(false));
    },
    synchronize: () => {
      dispatch(listMovies());
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Movies);