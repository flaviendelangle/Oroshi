import React, { Component } from 'react';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import muiThemeable from 'material-ui/styles/muiThemeable';

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
    if (this.state.stepIndex === 0) {
      return 'What to you want to put in your collection ?';
    }
    return 'How should I name it ?';
  }
  
  create = () => {
    if (this.state.title) {
      const data = {
        title: this.state.title,
        user: this.props.profile.pk
      };
      this.props.create(this.state.type, data);
    }
  };
  
  pickCollectionType = (type) => {
    this.setState({ type, stepIndex: 1 });
  };
  
  renderActions = () => {
    if (this.state.stepIndex > 0) {
      return (
        <FlatButton
          label="Create"
          primary={true}
          onClick={this.create}
          style={{color: this.props.muiTheme.palette.alternateTextColor}}
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
  
  componentWillReceiveProps(newProps) {
    if (this.props.isOpen && !newProps.isOpen) {
      this.setState({ stepIndex: 0 });
    }
  }
  
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

const mapStateToProps = (state) => {
  const root = state.home.dialogCreateCollection.main;
  const homeRoot = state.home.main;
  const appRoot = state.app;
  return {
    isOpen: root.show,
    update: root.update,
    isImportingContent: root.isImportingContent,
    collections: homeRoot.collections,
    profile: appRoot.profile
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    close: () => dispatch(showDialogCreateCollection(false)),
    create: (...args) => dispatch(createCollection(...args)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(muiThemeable()(DialogCreateCollection));