import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import { showDialogCreateCollection } from './actions'

class DialogCreateCollection extends Component {
  
  constructor(props) {
    super(props);
    this.close = props.close;
    this.submit = props.submit;
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
        title="Your new collection"
        actions={actions}
        modal={false}
        open={this.props.isOpen}
        onRequestClose={this.close}
        autoScrollBodyContent={true}
      >
        TOTO
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  return {
    isOpen: state.home.dialogCreateCollection.main.isAddingACollection
  }
};

const mapDispatchToProps = dispatch => {
  return {
    close: () => {
      dispatch(showDialogCreateCollection(false));
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogCreateCollection);