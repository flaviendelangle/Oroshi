import React, { Component } from 'react'
import { connect } from 'react-redux'
import { submit } from 'redux-form'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import CollectionStepper from './components/CollectionStepper'
import Content from './components/Content'
import { showDialogCreateCollection, createCollection } from './actions'


class DialogCreateCollection extends Component {
  
  state = {
    stepIndex: 0
  };
  
  actions = {
    save: (
        <FlatButton
          label="Save"
          primary={true}
          onClick={() => this.create()}
        />
      ),
    next: (
        <FlatButton
          label="Next"
          primary={true}
          onClick={() => this.nextStep()}
        />
      ),
    back: (
        <FlatButton
        label="Back"
        primary={true}
        onClick={() => this.lastStep()}
        />
      )
  };
  
  create = () => {
    const {data, idList} = this.child.submit();
    /*this.props.create(data);
    this.setState({ stepIndex: 0 });
    this.props.close();*/
  };

  nextStep = () => {
    if(this.state.stepIndex === 1) {
      this.props.submitConfiguration();
    } else {
      this.setState({ stepIndex: ++this.state.stepIndex });
    }
  };
  
  lastStep = () => {
    this.setState({ stepIndex: --this.state.stepIndex });
  };
  
  renderActions = () => {
    const actions = [];
    if(this.state.stepIndex > 0) {
      actions.push(this.actions.back);
    }
    if(this.state.stepIndex < 2) {
      actions.push(this.actions.next);
    } else {
      actions.push(this.actions.save);
    }
    return actions;
  };
  
  render() {
    const actions = this.renderActions();
    return (
      <Dialog
        title="Your new collection"
        actions={actions}
        modal={false}
        open={this.props.isOpen}
        onRequestClose={this.props.close}
        autoScrollBodyContent={true}
      >
        <CollectionStepper stepIndex={this.state.stepIndex} />
        <Content
          stepIndex={this.state.stepIndex}
          collections={this.props.collections}
          onStepIndexUpdate={(stepIndex) => this.setState({ stepIndex })}
          onRef={ref => this.child = ref}
        />
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  return {
    isOpen: state.home.dialogCreateCollection.main.isAddingACollection,
    collections: state.home.main.collections
  }
};

const mapDispatchToProps = dispatch => {
  return {
    close: () => dispatch(showDialogCreateCollection(false)),
    create: (data) => dispatch(createCollection(data)),
    submitConfiguration: () => dispatch(submit('DialogCreateCollectionConfigurationForm'))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogCreateCollection);