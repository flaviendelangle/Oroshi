import React, { Component } from 'react'
import { connect } from 'react-redux'
import IconButton from 'material-ui/IconButton';
import ContentSave from 'material-ui/svg-icons/content/save';

import theMovieDb from './../../../../../../themoviedb';
import { MoviesAPI } from "../../../../../../api";

import { addMovieToServer } from './actions'

class SaveButton extends Component {
  
  state = {
    show: false
  };
  
  constructor(props) {
    super(props);
    MoviesAPI.detail_route(this.props.data.id, 'tmdbId').then((response) => {
      this.setState({ show: (response.pk === 0) });
    });
  }
  
  render() {
    if(!this.state.show) {
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

const mapStateToProps = state => {
  return {
  }
};

const mapDispatchToProps = dispatch => {
  return {
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