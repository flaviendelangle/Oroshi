import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import theMovieDb from './../../themoviedb';

import Form  from './components/Form/index'
import MoviesList from './components/MoviesList/index'
import { showDialogAddMovie, updateAutoComplete } from './actions'

const style = {
};

class DialogAddMovie extends Component {
  
  constructor(props) {
    super(props);
    this.close = props.close;
    this.search = props.search;
    this.save = props.handleSubmit;
  }
  
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.close}
      />,
      <FlatButton
        label="Save"
        type="submit"
        primary={true}
        onClick={this.save}
      />,
    ];
    
    return (
        <Dialog
          title="New movie"
          actions={actions}
          modal={true}
          open={this.props.isOpen}
          autoScrollBodyContent={true}
          style={style}
        >
          <Form onSubmit={this.search}/>
          <MoviesList/>
        </Dialog>
    );
  }
}

// Decorate with connect to read form values

const mapStateToProps = state => {
  return {
    isOpen: state.movies.dialogAddMovie.main.isAddingAMovie,
    moviesList: state.movies.dialogAddMovie.moviesList.data
  }
};

const mapDispatchToProps = dispatch => {
  return {
    close: () => {
      dispatch(showDialogAddMovie(false));
    },
    search: (data) => {
      if(data && data.title) {
        theMovieDb.search.getMovie({"query":data.title}, (response) => {
          dispatch(updateAutoComplete(JSON.parse(response)));
        }, () => {});
      }
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogAddMovie);