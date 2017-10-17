import React, { Component } from 'react'
import { connect } from 'react-redux'
import { submit } from 'redux-form'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import Form  from './components/Form'
import { showDialogCreateCollection, createCollection } from './actions'


class DialogCreateCollection extends Component {
  
  constructor(props) {
    super(props);
    this.close = props.close;
    this.submit = props.submit;
  }
  
  create = (data) => {
    if(data.title) {
      this.close();
      this.props.create(data);
    }
  };
  
  render() {
    const actions = [
      <FlatButton
        label="Save"
        primary={true}
        onClick={this.submit}
      />,
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
        <Form onSubmit={this.create}/>
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
    close: () => dispatch(showDialogCreateCollection(false)),
    create: (data) => dispatch(createCollection(data)),
    submit: () => dispatch(submit('DialogCreateCollectionForm'))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogCreateCollection);