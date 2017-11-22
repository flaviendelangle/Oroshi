import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import CollectionType from './components/CollectionType';
import CollectionConfiguration from './components/CollectionConfiguration';
import { create as createCollection } from 'services/actions/collections'
import { showDialogCreateCollection } from './actions'


class DialogCreateCollection extends Component {
  
  state = {
    stepIndex: 0,
    type: null,
    title: ''
  };
  
  get title() {
    if(this.state.stepIndex === 0) {
      return 'What to you want to put in your collection ?';
    }
    return 'How should I name it ?';
  }
  
  create = () => {
    if(this.state.title) {
      const data = {
        title: this.state.title
      };
      this.props.create(this.state.type, data);
    }
  };
  
  pickCollectionType = type => {
    this.setState({ type, stepIndex: 1 });
  };
  
  renderActions = () => {
    if(this.state.stepIndex > 0) {
      return (
        <FlatButton
          label="Create"
          primary={true}
          onClick={this.create}
        />
      );
    } else {
      return null;
    }
  };
  
  renderContent = () => {
    if (this.state.stepIndex === 0) {
      return (
        <CollectionType onClick={this.pickCollectionType} />
      );
    }
    return (
      <CollectionConfiguration
        onTitleChange={(proxy, title) => this.setState({ title }) }
      />
    );
  };
  
  close = () => {
    this.setState({
      importerMode: false,
      stepIndex: 0
    });
    this.props.close();
  };
  
  render() {
    const actions = this.renderActions();
    return (
      <Dialog
        title={this.title}
        actions={actions}
        modal={false}
        open={this.props.isOpen}
        onRequestClose={this.close}
        autoScrollBodyContent={true}
      >
        {this.renderContent()}
      </Dialog>

    );
  }
}

const mapStateToProps = state => {
  return {
    isOpen: state.home.dialogCreateCollection.main.show,
    collections: state.home.main.collections,
    update: state.home.dialogCreateCollection.main.update,
    isImportingContent: state.home.dialogCreateCollection.main.isImportingContent
  }
};

const mapDispatchToProps = dispatch => {
  return {
    close: () => dispatch(showDialogCreateCollection(false)),
    create: (...args) => dispatch(createCollection(...args)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogCreateCollection);