import React, { Component } from 'react'
import { connect } from 'react-redux'
import IconButton from 'material-ui/IconButton';
import ContentSave from 'material-ui/svg-icons/content/save';

import { saveMovie } from './actions'

class SaveButton extends Component {
  
  render() {
    return (
      <IconButton onClick={() => this.props.save(this.props.data)}>
        <ContentSave/>
      </IconButton>
    )
  }
  
}

// Decorate with connect to read form values

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    save: data => dispatch(saveMovie(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveButton);