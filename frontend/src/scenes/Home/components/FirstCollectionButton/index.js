import React, { Component } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';

import { showDialogCreateCollection } from '../DialogCreateCollection/actions'

const containerStyle = {
  textAlign: 'center'
};


class FirstCollectionButton extends Component {
  
  render() {
    return (
      <div style={containerStyle} >
        <RaisedButton label="Create your first collection" onClick={this.props.onClick} />
      </div>
    )
    
  }
}

const mapStateToProps = (state) => {
  return {
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => dispatch(showDialogCreateCollection(true))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FirstCollectionButton);
