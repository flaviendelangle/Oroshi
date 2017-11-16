import React, { Component } from 'react'
import { connect } from 'react-redux'
import { readAsText } from 'promise-file-reader'

import CollectionType from './components/CollectionType';
import CollectionSource from './components/CollectionSource';
import CollectionConfiguration from './components/CollectionConfiguration';
import CollectionCustomization from './components/CollectionCustomization';
import { parseCSV } from 'services/utils';

class Content extends Component {
  
  state = {
    collectionType: {},
    collectionSource: {},
    collectionConfiguration: {},
    collectionCustomization: {}
  };
  
  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }
  
  setCollectionType = state => {
    this.setState({ collectionType: state });
  };
  
  setCollectionSource = state => {
    this.setState({ collectionSource: state });
  };
  
  setCollectionCustomization = identiconString => {
    this.setState({ collectionCustomization: { identiconString }});
  };
  
  validateConfiguration = collectionConfiguration => {
    const params = this.state.collectionSource;
    if(params.source === 'external' && params.external === 'csv_file') {
      if(!collectionConfiguration.csv) {
        return false;
      }
    }
    if(collectionConfiguration.title) {
      this.props.onStepIndexUpdate(this.props.stepIndex + 1);
      this.setState({ collectionConfiguration })
    }
  };
  
  submit = () => {
    let elementsToImport;
    const params = this.state.collectionSource;
    if(params.source === 'external' && params.external === 'csv_file') {
      elementsToImport = readAsText(this.state.collectionConfiguration.csv).then(result => {
        return parseCSV(result);
      });
    }
    let data = {
      title: this.state.collectionConfiguration.title,
      password: this.state.collectionConfiguration.password,
      hash: this.state.collectionCustomization.identiconString,
      adult_content: this.state.collectionConfiguration.adult_content || false
    };
    if(this.state.collectionSource.source === 'duplicate') {
      data.duplicate = this.state.collectionSource.duplicate;
    } else {
      data.duplicate = 0;
    }
    return {
      type: this.state.collectionType.type,
      data,
      elementsToImport
    }
  };
  
  render() {
    switch(this.props.stepIndex) {
      
      case(0):
        return (
          <CollectionType
            onChange={this.setCollectionType}
            initialValues={this.state.collectionType}
          />
        );
      
      case(1):
        return (
          <CollectionSource
            onChange={this.setCollectionSource}
            collections={this.props.collections}
            initialValues={this.state.collectionSource}
          />
        );
  
      case(2):
        return (
          <CollectionConfiguration
            collectionSource={this.state.collectionSource}
            initialValues={this.state.collectionConfiguration}
            onSubmit={this.validateConfiguration}
          />
        );
  
      case(3):
        return (
          <CollectionCustomization
            onChange={this.setCollectionCustomization}
          />
        );
        
      default:
        return null;
    }

  }
}

const mapStateToProps = state => {
  return {
  }
};

const mapDispatchToProps = dispatch => {
  return {
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Content);