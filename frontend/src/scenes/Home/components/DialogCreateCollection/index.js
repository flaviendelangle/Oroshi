import React, { Component } from 'react'
import { connect } from 'react-redux'
import { submit } from 'redux-form'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import CollectionStepper from './components/CollectionStepper'
import Content from './components/Content'
import MoviesImporter from './components/MoviesImporter'
import { showDialogCreateCollection, createCollection } from './actions'

const fromName = 'DialogCreateCollectionConfigurationForm';

class DialogCreateCollection extends Component {
  
  state = {
    stepIndex: 0,
    importingMovies: false
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
    let {data, moviesToImport} = this.child.submit();
    if(moviesToImport) {
      moviesToImport = moviesToImport.then(data => {
        this.setState({importingMovies: true});
        return data;
      });
    }
    else {
      this.setState({ stepIndex: 0 });
      this.props.close();
    }
    this.props.create(data, moviesToImport);
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
  
  renderContent = () => {
    if(!this.state.importingMovies) {
      return (
        <div>
          <CollectionStepper stepIndex={this.state.stepIndex} />
          <Content
            stepIndex={this.state.stepIndex}
            collections={this.props.collections}
            onStepIndexUpdate={(stepIndex) => this.setState({ stepIndex })}
            onRef={ref => this.child = ref}
          />
        </div>
    
      );
    } else {
      return (
        <MoviesImporter/>
      );
    }
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
        {this.renderContent()}
      </Dialog>

    );
  }
}

const mapStateToProps = state => {
  return {
    isOpen: state.home.dialogCreateCollection.main.isAddingACollection,
    collections: state.home.main.collections,
    update: state.home.dialogCreateCollection.main.update
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