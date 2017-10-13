import React, { Component } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';

import DialogAddMovie from './components/DialogAddMovie/index'
import MoviesTable from './components/MoviesTable/index'
import { synchronizeMovies } from './actions'
import { showDialogAddMovie } from './components/DialogAddMovie/actions'
import { MoviesAPI } from './api'

class Movies extends Component {
  
  constructor({ openModal, closeModal, synchronize }) {
    super();
    this.openModal = openModal;
    this.closeModal = closeModal;
    this.synchronize = synchronize;
    this.synchronize();
  }
  
  saveNewMovie = (data) => {
    this.closeModal();
  };
  
  render() {
    return (
      <div>
        <MoviesTable/>
        <RaisedButton label="Add" primary={true} onClick={this.openModal}/>
        <DialogAddMovie onSubmit={this.saveNewMovie}/>
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
    openModal: () => {
      dispatch(showDialogAddMovie(true));
    },
    closeModal: (data) => {
      dispatch(showDialogAddMovie(false));
    },
    synchronize: () => {
      MoviesAPI.list().then((response) => {
        dispatch(synchronizeMovies(response));
      });
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Movies);