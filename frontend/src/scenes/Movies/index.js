import React, { Component } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';

import DialogAddMovie from './components/DialogAddMovie/index'
import { showDialogAddMovie } from './actions'


class Movies extends Component {
  
  constructor({ addAMovie }) {
    super();
    this.addAMovie = addAMovie;
  }
  
  openModal() {
  
  }
  
  render() {
    return (
      <div>
        <RaisedButton label="Add" primary={true} onClick={this.addAMovie}/>
        <DialogAddMovie/>
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
    addAMovie: () => {
      dispatch(showDialogAddMovie());
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Movies);