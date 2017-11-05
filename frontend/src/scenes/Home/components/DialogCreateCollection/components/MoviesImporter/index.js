import React, { Component } from 'react'
import { connect } from 'react-redux'

class MoviesImporter extends Component {
  
  render() {
    console.log(this.props.moviesToImport);
    return (null);
  }
}

const mapStateToProps = state => {
  return {
    moviesToImport: state.home.dialogCreateCollection.moviesImporter.moviesToImport
  }
};

const mapDispatchToProps = dispatch => {
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesImporter);