import React, { Component } from 'react'
import { connect } from 'react-redux'
import { submit } from 'redux-form'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import CollectionStepper from './components/CollectionStepper'
import Content from './components/Content'
import ContentImporter from './components/ContentImporter'
import { showDialogCreateCollection, createCollection } from './actions'

const fromName = 'DialogCreateCollectionConfigurationForm';

class DialogCreateCollection extends Component {
  
  state = {
    stepIndex: 0,
    importerMode: false
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
      ),
    close: (
      <FlatButton
        label="Close"
        primary={true}
        onClick={() => this.close()}
      />
    )
  };
  
  create = () => {
    let { type, data, elementsToImport } = this.child.submit();
    if(elementsToImport) {
      elementsToImport = elementsToImport.then(data => {
        this.setState({
          importerMode: type,
          stepIndex: 0
        });
        return data;
      });
    }
    else {
      this.close();
    }
    this.props.create(type, data, elementsToImport);
  };

  nextStep = () => {
    if(this.state.stepIndex === 2) {
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
    if(!this.props.isImportingContent) {
      actions.push(this.actions.close);
    }
    if(!this.state.importerMode) {
      if(this.state.stepIndex < 3) {
        actions.push(this.actions.next);
      } else {
        actions.push(this.actions.save);
      }
    }
    return actions;
  };
  
  renderContent = () => {
    if(!this.state.importerMode) {
      return (
        <div>
          <CollectionStepper stepIndex={this.state.stepIndex} />
          <Content
            stepIndex={this.state.stepIndex}
            collections={this.props.collections}
            onStepIndexUpdate={stepIndex => this.setState({ stepIndex })}
            onRef={ref => this.child = ref}
          />
        </div>
    
      );
    } else {
      return (
        <ContentImporter scene={this.state.importerMode} />
      );
    }
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
        title="Your new collection"
        actions={actions}
        modal={true}
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
    submitConfiguration: () => dispatch(submit(fromName)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogCreateCollection);