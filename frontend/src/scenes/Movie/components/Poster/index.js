import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper';

import { path } from '../../../../services/TheMovieDatabaseJS/images'


const paperStyle = {
  display: 'inline-block'
};

const imgStyle = {
  marginBottom: -4
};

class Poster extends Component {

  url = (poster) => {
    return path + '/w185' + poster.file_path;
  };
  
  render() {
    if(this.props.posters.length === 0) {
      return (null);
    }
    return (
      <Paper style={paperStyle} zDepth={3}>
        <img style={imgStyle} src={this.url(this.props.posters[0])} />
      </Paper>
    );
    
  }
  
}

const mapStateToProps = state => {
  return {
    posters: state.movie.poster.posters
  }
};

const mapDispatchToProps = dispatch => {
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Poster);