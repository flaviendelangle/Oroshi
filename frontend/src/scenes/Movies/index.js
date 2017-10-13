import React, { Component } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';

import DialogAddMovie from './components/DialogAddMovie/index'
import MoviesTable from './components/MoviesTable/index'
import { showDialogAddMovie } from './components/DialogAddMovie/actions'

class Movies extends Component {
  
  constructor({ openModal, closeModal }) {
    super();
    this.openModal = openModal;
    this.closeModal = closeModal;
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
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Movies);