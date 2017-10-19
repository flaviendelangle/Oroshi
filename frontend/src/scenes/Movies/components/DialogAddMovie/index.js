import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import SearchBar from 'material-ui-search-bar'

import MoviesList from './components/MoviesList'
import { showDialogAddMovie, searchMovies } from './actions'

const searchStyle = {
  margin: '0 auto 20px auto',
  maxWidth: 500
};

class DialogAddMovie extends Component {
  
  state = {
    query: ''
  };
  
  render() {
    
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.props.close}
      />
    ];
    
    return (
        <Dialog
          title="New movie"
          actions={actions}
          modal={false}
          open={this.props.isOpen}
          onRequestClose={this.props.close}
          autoScrollBodyContent={true}
        >
          <SearchBar
            onChange={(query) => this.setState({query})}
            onRequestSearch={() => {
              this.props.search(this.props.collection, this.state.query);
            }}
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
    close: () => dispatch(showDialogAddMovie(false)),
    search: (collection, query) => {
      if(query) {
        dispatch(searchMovies(collection, query));
      }
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogAddMovie);