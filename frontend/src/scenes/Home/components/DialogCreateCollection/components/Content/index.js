import React, { Component } from 'react'
import { connect } from 'react-redux'

import CollectionType from './components/CollectionType'
import CollectionConfiguration from './components/CollectionConfiguration'
import CollectionCustomization from './components/CollectionCustomization'

class Content extends Component {
  
  state = {
    collectionType: {},
    collectionConfiguration: {},
    collectionCustomization: {}
  };
  
  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }
  
  setCollectionType = (state) => {
    this.setState({ collectionType: state });
  };
  
  setCollectionCustomization = identiconString => {
    this.setState({ collectionCustomization: { identiconString }});
  };
  
  validateConfiguration = (collectionConfiguration) => {
    if(collectionConfiguration.title) {
      this.props.onStepIndexUpdate(this.props.stepIndex + 1);
      this.setState({ collectionConfiguration })
    }
  };
  
  submit = () => {
    let results = {};
    if(this.state.collectionType.type === 'duplicate') {
      results.duplicate = this.state.collectionType.duplicate;
    } else {
      results.duplicate = 0;
    }
    return {
      ...results,
      title: this.state.collectionConfiguration.title,
      password: this.state.collectionConfiguration.password,
      hash: this.state.collectionCustomization.identiconString,
      adult_content: this.state.collectionConfiguration.adult_content || false
    }
  };
  
  render() {
    if(this.props.stepIndex === 0) {
      return (
        <CollectionType
          onChange={this.setCollectionType}
          collections={this.props.collections}
          initialValues={this.state.collectionType}
        />
      );
    }
    else if(this.props.stepIndex === 1) {
      return (
        <CollectionConfiguration
          collectionType={this.state.collectionType}
          initialValues={this.state.collectionConfiguration}
          onSubmit={this.validateConfiguration}
        />
      )
    } else if(this.props.stepIndex === 2) {
      return (
        <CollectionCustomization
          onChange={this.setCollectionCustomization}
        />
      );
    } else {
      return (null);
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