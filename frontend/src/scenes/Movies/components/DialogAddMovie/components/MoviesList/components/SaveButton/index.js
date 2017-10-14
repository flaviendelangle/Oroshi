import React, { Component } from 'react'
import { connect } from 'react-redux'
import IconButton from 'material-ui/IconButton';
import ContentSave from 'material-ui/svg-icons/content/save';

import theMovieDb from './../../../../../../themoviedb';
import { MoviesAPI } from "../../../../../../api";

import { addMovieToServer, showButton } from './actions'


class SaveButton extends Component {
  
  constructor(props) {
    super(props);
    MoviesAPI.detail_route(this.props.data.id, 'tmdbId').then((response) => {
      this.props.updateVisibility((response.pk === 0), this.props.data.id);
    });
  }
  
  render() {
    if(!this.props.show) {
      return (null);
    }
    return (
      <IconButton onClick={() => this.props.save(this.props.data)}>
        <ContentSave/>
      </IconButton>
    )
  }
  
}

// Decorate with connect to read form values

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.data.id;
  const compsState = state.movies.dialogAddMovie.moviesList.saveButton;
  const show = compsState[id] === undefined ? false : compsState[id].show;
  return {
    show: show
  }
};

const mapDispatchToProps = dispatch => {
  return {
    updateVisibility: (show, id) => {
      dispatch(showButton(show, id));
    },
    save: data => {
      theMovieDb.movies.getById({ id:data.id }, (response) => {
        const information = JSON.parse(response);
        theMovieDb.movies.getCredits({ id:data.id }, (response) => {
          const staff = JSON.parse(response);
          dispatch(addMovieToServer({information, staff}));
        }, () => {});
      }, () => {});
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveButton);