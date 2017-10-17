import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import SearchBar from 'material-ui-search-bar'

import theMovieDb from '../../services/themoviedb';

import MoviesList from './components/MoviesList'
import { showDialogAddMovie, updateAutoComplete } from './actions'

const searchStyle = {
  margin: '0 auto 20px auto',
  maxWidth: 500
};

class DialogAddMovie extends Component {
  
  state = {
    query: ''
  };
  
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
        >
          <SearchBar
            onChange={(query) => this.setState({query})}
            onRequestSearch={() => {this.search(this.state.query);}}
            style={searchStyle}
          />
          <MoviesList/>
        </Dialog>
    );
  }
}

const mapStateToProps = state => {
  return {
    isOpen: state.movies.dialogAddMovie.main.isAddingAMovie,
    moviesList: state.movies.dialogAddMovie.moviesList.main.data
  }
};

const mapDispatchToProps = dispatch => {
  return {
    close: () => {
      dispatch(showDialogAddMovie(false));
    },
    search: (query) => {
      if(query) {
        theMovieDb.search.getMovie({"query":query}, (response) => {
          dispatch(updateAutoComplete(JSON.parse(response)));
        }, () => {});
      }
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogAddMovie);