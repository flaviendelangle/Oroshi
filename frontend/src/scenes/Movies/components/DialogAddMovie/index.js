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
  }
  
  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.close}
      />
    ];
    
    return (
        <Dialog
          title="New movie"
          actions={actions}
          modal={false}
          open={this.props.isOpen}
          onRequestClose={this.close}
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